import { create } from "zustand";
import { User } from "@/app/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  hydrateUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  setUser: (user: User) => set({ user, isAuthenticated: true }),

  clearIsAuthenticated: () =>
    set({ user: null, isAuthenticated: false, isHydrated: true }),

  hydrateUser: async () => {
    try {
      const res = await fetch("/api/users/current/full", {
        credentials: "include",
      });

      if (!res.ok) {
        set({ user: null, isAuthenticated: false, isHydrated: true });
        return;
      }

      const user: User = await res.json();
      set({ user, isAuthenticated: true, isHydrated: true });
    } catch {
      set({ user: null, isAuthenticated: false, isHydrated: true });
    }
  },
}));
