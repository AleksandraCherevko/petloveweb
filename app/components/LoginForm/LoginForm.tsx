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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Invalid credentials");
        return;
      }

      toast.success("Login successful");
      router.push("/profile");
    } catch {
      toast.error("Server error");
    }
  };

  // const onSubmit = async (data: LoginFormValues) => {
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     const user = await res.json();

  //     if (!res.ok) {
  //       toast.error(user.error || "Invalid email or password");
  //       return;
  //     }
  //     setUser(user);
  //     toast.success(`Welcome, ${user.name ?? user.email}!`);
  //     router.push("/profile");
  //   } catch {
  //     toast.error("Server error, please try again");
  //   }
  // };

  //   try {
  //     const user = await login(data); // відправка на backend
  //     if (!user.token) {
  //       toast.error("Login failed: no token received");
  //       return;
  //     }

  //     setUser(user); // автоматична авторизація через Zustand
  //     toast.success(`Welcome, ${user.name ?? user.email}!`);
  //     router.push("/profile"); // переадресація на приватну сторінку
  //   } catch (err: any) {
  //     // Відображення помилки backend у вигляді notification
  //     toast.error(err.message || "Invalid email or password");
  //   }
  // };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.loginForm}
      noValidate
      autoComplete="off"
    >
      {/* EMAIL */}
      <div className={css.inputWrapper}>
        <div className={css.inputField}>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={`${css.loginInput}
            ${errors.email ? css.error : ""}
            ${!errors.email && emailValue ? css.success : ""}
          `}
          />
          {errors.email && (
            <span className={css.iconError}>
              <svg className={css.crossIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-cross-red" />
              </svg>
            </span>
          )}

          {!errors.email && emailValue && (
            <span className={css.iconSuccess}>
              <svg className={css.checkIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-check" />
              </svg>
            </span>
          )}
        </div>
        {errors.email && (
          <p className={css.errorText}>{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className={css.inputWrapper}>
        <div className={`${css.inputField} ${css.passwordField}`}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={`${css.loginInput}
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
            {showPassword ? (
              <svg width="18" height="18">
                <use href="/symbol-defs.svg#icon-eye" />
              </svg>
            ) : (
              <svg width="18" height="18">
                <use href="/symbol-defs.svg#icon-eye-off" />
              </svg>
            )}
          </button>
          {errors.password && (
            <span className={css.iconError}>
              <svg className={css.crossIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-cross-red" />
              </svg>
            </span>
          )}
          {!errors.password && passwordValue && (
            <span className={css.iconSuccess}>
              <svg className={css.checkIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-check" />
              </svg>
            </span>
          )}
        </div>
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={css.loginFormBtn}
      >
        {isSubmitting ? "Loging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
