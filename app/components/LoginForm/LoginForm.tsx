"use client";
import * as yup from "yup";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { LoginFormValues } from "@/app/types/login";
import css from "./LoginForm.module.css";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Please, enter your email")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    ),
  password: yup
    .string()
    .required("Please, enter your password")
    .min(7, "Password must be at least 7 characters"),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const emailValue = useWatch({ control, name: "email" });
  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Invalid email or password");
        return;
      }

      // ✅ токены уже установлены сервером (cookies)
      router.push("/profile");
    } catch {
      toast.error("Server error, please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.loginForm}
      noValidate
      autoComplete="off"
    >
      {/* EMAIL */}
      <div className={css.inputWrapper}>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className={`${css.input}
            ${errors.email ? css.error : ""}
            ${!errors.email && emailValue ? css.success : ""}
          `}
        />
        {errors.email && (
          <p className={css.errorText}>{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className={css.inputWrapper}>
        <div className={css.passwordField}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={`${css.input}
              ${errors.password ? css.error : ""}
              ${!errors.password && passwordValue ? css.success : ""}
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className={css.eyeButton}
            aria-label="Toggle password visibility"
          >
            👁
          </button>
        </div>
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className={css.submitBtn}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
