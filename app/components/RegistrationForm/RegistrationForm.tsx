"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import { User } from "@/app/types/user";

type RegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Please, enter your name"),
  email: yup
    .string()
    .required("Please, enter your email")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email. Please, try again",
    ),
  password: yup
    .string()
    .required("Please, enter your email")
    .min(7, "Password must be at least 7 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegistrationForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [backendError, setBackendError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setBackendError("");

    try {
      const { confirmPassword, ...payload } = data; // eslint-disable-line @typescript-eslint/no-unused-vars

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: User & { error?: string } = await res.json();

      if (res.ok && result.token) {
        setUser(result);
        router.push("/profile");
      } else {
        setBackendError(result.error || "Registration failed");
      }
    } catch {
      setBackendError("Server error, please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="text" {...register("name")} placeholder="Name" />

        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <input type="email" {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password")}
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <svg width="20" height="20">
              <use href="/symbol-defs.svg#icon-eye"></use>
            </svg>
          ) : (
            <svg width="20" height="20">
              <use href="/symbol-defs.svg#icon-eye-off"></use>
            </svg>
          )}
        </button>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
        />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? (
            <svg width="20" height="20">
              <use href="/symbol-defs.svg#icon-eye"></use>
            </svg>
          ) : (
            <svg width="20" height="20">
              <use href="/symbol-defs.svg#icon-eye-off"></use>
            </svg>
          )}
        </button>
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Registration"}
      </button>

      {backendError && <div>{backendError}</div>}
    </form>
  );
};

export default RegistrationForm;
