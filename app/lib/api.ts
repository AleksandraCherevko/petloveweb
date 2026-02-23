import axios, { AxiosError } from "axios";
import { User } from "../types/user";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: "https://petlove.b.goit.study/api",
  withCredentials: true,
});

export const nextServer = axios.create({
  baseURL: "/api",
  // baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

// news

export type New = {
  _id: number;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
};

export type NewsListResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  results: New[];
};

// news searching
export const getNews = async (page = 1, perPage = 6) => {
  const res = await api.get<NewsListResponse>("/news", {
    params: { page, perPage },
  });
  return res.data;
};

export const getNewsClient = async (page = 1, perPage = 6, query = "") => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (query) {
    params.set("query", query); // <-- это станет keyword на сервере
  }

  const res = await fetch(`/api/news?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch news");

  return res.json();
};

// our friends

export type workDays = {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
};

export type Friend = {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  address?: string;
  workDays: workDays[] | null;
  phone?: number;
  email?: string;
};

export type FriendListResponse = {
  friends: Friend[];
  total: number;
};

export const getFriends = async (): Promise<Friend[]> => {
  const res = await api.get<Friend[]>("/friends");
  return res.data;
};

// notices

export type Notice = {
  _id: string;
  species: string;
  category: string;
  price?: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  imgURL: string;
  popularity: number;
  comment: string;
};

export type NoticeResponse = {
  results: Notice[];
  page: number;
  perPage: number;
  totalPages: number;
};

export type NoticeDetails = Notice & {
  user?: { phone?: string; email?: string };
  owner?: { phone?: string; email?: string };
  phone?: string;
  email?: string;
  isFavorite?: boolean;
};

export type NoticesQuery = {
  page?: number;
  perPage?: number;
  query?: string;
  category?: string;
  sex?: string;
  species?: string;
  locationId?: string;
  sort?: "popular" | "unpopular" | "cheap" | "expensive";
};

export const getNoticesClient = async ({
  page = 1,
  perPage = 6,
  query = "",
  category = "",
  sex = "",
  species = "",
  locationId = "",
  sort,
}: NoticesQuery): Promise<NoticeResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (query) params.set("query", query);
  if (category) params.set("category", category);
  if (sex) params.set("sex", sex);
  if (species) params.set("species", species);
  if (locationId) params.set("locationId", locationId);
  if (sort) params.set("sort", sort);

  const res = await fetch(`/api/notices?${params.toString()}`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch notices");
  return res.json();
};

export const getNoticeById = async (id: string): Promise<NoticeDetails> => {
  const { data } = await nextServer.get<NoticeDetails>(`/notices/${id}`);
  return data;
};

export const isUnauthorizedError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 401;

export const getCategoriesClient = async (): Promise<string[]> => {
  const res = await fetch("/api/notices/categories", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const getSexesClient = async (): Promise<string[]> => {
  const res = await fetch("/api/notices/sex", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch sexes");
  return res.json();
};

export const getSpeciesClient = async (): Promise<string[]> => {
  const res = await fetch("/api/notices/species", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch species");
  return res.json();
};

export type City = {
  _id: string;
  useCounty: number;
  stateEn: string;
  cityEn: string;
  countyEn: string;
};

export const getCities = async (keyword: string): Promise<City[]> => {
  try {
    const res = await axios.get(
      `https://petlove.b.goit.study/api/cities/locations`,
      {
        params: { keyword },
      },
    );

    return res.data;
  } catch (err) {
    console.error("Failed to fetch cities", err);
    return [];
  }
};

// REGISTRATION FORM

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type Pet = {
  _id: string;
  name: string;
  title?: string;
  imgURL?: string;
  species: string;
  birthday?: string;
  sex?: string;
  createdAt: string;
  updatedAt: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/users/signup", data);
  return res.data;
};

// LOGIN FORM

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/users/signin", data);
  return res.data;
};

// GET AUTH USER

export const getUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/current/full");
  return data;
};

// LOGOUT

export const logout = async (): Promise<void> => {
  await nextServer.post("/users/signout");
};
// PETS

export type PetListResponse = {
  pets: Pet[];
  total: number;
};

export const getPets = async () => {
  const res = await axios.get<PetListResponse>("/profile");
  return res.data;
};

// export const addNoticeToFavorites = async (
//   id: string,
// ): Promise<"added" | "already"> => {
//   try {
//     console.log("API add favorite id:", id);
//     await nextServer.post(`/notices/favorites/add/${id}`);
//     return "added";
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("ADD FAVORITE ERROR DATA:", error.response?.data);
//     }
//     if (axios.isAxiosError(error) && error.response?.status === 400) {
//       return "already";
//     }
//     throw error;
//   }
// };
export const addNoticeToFavorites = async (
  id: string,
): Promise<"added" | "already"> => {
  try {
    await nextServer.post(`/notices/favorites/add/${id}`);
    return "added";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400 || status === 409) {
        return "already";
      }
    }
    throw error;
  }
};

// export const removeNoticeFromFavorites = async (
//   id: string,
// ): Promise<"removed" | "already"> => {
//   try {
//     await nextServer.delete(`/notices/favorites/remove/${id}`);
//     return "removed";
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response?.status === 400) {
//       return "already";
//     }
//     throw error;
//   }
// };
export const removeNoticeFromFavorites = async (
  id: string,
): Promise<"removed" | "already"> => {
  try {
    await nextServer.delete(`/notices/favorites/remove/${id}`);
    return "removed";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 400 || status === 409) {
        return "already";
      }
    }
    throw error;
  }
};
