"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/store/auth";
import css from "./RegistrationForm.module.css";
import toast from "react-hot-toast";

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
    .required("Please, enter your password")
    .min(7, "Password must be at least 7 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegistrationForm = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(schema),
  });

  const emailValue = useWatch({
    control,
    name: "email",
  });

  const nameValue = useWatch({
    control,
    name: "name",
  });

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  const confirmPasswordValue = useWatch({
    control,
    name: "confirmPassword",
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      const payload = {
        name: data.name,
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          toast.error("User with this email already exists");
        } else {
          toast.error(
            result?.error || result?.message || "Registration failed",
          );
        }
        return;
      }
      const meRes = await fetch("/api/users/current/full", {
        method: "GET",
        credentials: "include",
      });

      if (!meRes.ok) {
        toast.error("Registered, but failed to load profile");
        router.push("/login");
        return;
      }

      const me = await meRes.json();
      setUser(me);
      router.push("/profile");
    } catch {
      toast.error("Server error, please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css.registrationForm}
      autoComplete="off"
      noValidate
    >
      {/* NAME INPUT */}
      <div className={css.inputWrapper}>
        <div className={css.inputField}>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className={`${css.registerInput}
      ${errors.name ? css.error : ""}
      ${!errors.name && nameValue ? css.success : ""}
    `}
          />
          {errors.name && (
            <span className={css.iconError}>
              <svg className={css.crossIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-cross-red"></use>
              </svg>
            </span>
          )}
          {!errors.name && nameValue && (
            <span className={css.iconSuccess}>
              <svg className={css.checkIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-check"></use>
              </svg>
            </span>
          )}
        </div>
        {errors.name && <p className={css.errorText}>{errors.name.message}</p>}
      </div>

      {/* EMAIL INPUT */}
      <div className={css.inputWrapper}>
        <div className={css.inputField}>
          <input
            type="email"
            autoComplete="new-password"
            {...register("email")}
            placeholder="Email"
            className={`${css.registerInput}
      ${errors.email ? css.error : ""}
      ${!errors.email && emailValue ? css.success : ""}
    `}
          />
          {errors.email && (
            <span className={css.iconError}>
              <svg className={css.crossIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-cross-red"></use>
              </svg>
            </span>
          )}
          {!errors.email && emailValue && (
            <span className={css.iconSuccess}>
              <svg className={css.checkIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-check"></use>
              </svg>
            </span>
          )}
        </div>
        {errors.email && (
          <p className={css.errorText}>{errors.email.message}</p>
        )}
      </div>

      {/* PASSWORD INPUT */}
      <div className={css.inputWrapper}>
        <div className={`${css.inputField} ${css.passwordField}`}>
          <input
            {...register("password")}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`${css.registerInput} 
      ${errors.password ? css.error : ""}
      ${!errors.password && passwordValue ? css.success : ""}
    `}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={css.eyeButton}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg width="18" height="18">
                <use href="/symbol-defs.svg#icon-eye"></use>
              </svg>
            ) : (
              <svg width="18" height="18">
                <use href="/symbol-defs.svg#icon-eye-off"></use>
              </svg>
            )}
          </button>
          {errors.password && (
            <span className={css.iconError}>
              <svg className={css.crossIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-cross-red"></use>
              </svg>
            </span>
          )}
          {!errors.password && passwordValue && (
            <span className={css.iconSuccess}>
              <svg className={css.checkIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-check"></use>
              </svg>
            </span>
          )}
        </div>
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className={css.inputWrapper}>
        <div className={`${css.inputField} ${css.passwordField}`}>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className={`${css.registerInput} 
      ${errors.confirmPassword ? css.error : ""}
      ${!errors.confirmPassword && confirmPasswordValue ? css.success : ""}
    `}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className={css.eyeButton}
            aria-label="Toggle password visibility"
          >
            {showConfirmPassword ? (
              <svg width="18" height="18">
                <use href="/symbol-defs.svg#icon-eye"></use>
              </svg>
            ) : (
              <svg width="18" height="18">
                <use href="/symbol-defs.svg#icon-eye-off"></use>
              </svg>
            )}
          </button>
          {errors.confirmPassword && (
            <span className={css.iconError}>
              <svg className={css.crossIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-cross-red"></use>
              </svg>
            </span>
          )}
          {!errors.confirmPassword && confirmPasswordValue && (
            <span className={css.iconSuccess}>
              <svg className={css.checkIcon} width="18" height="18">
                <use href="/symbol-defs.svg#icon-check"></use>
              </svg>
            </span>
          )}
        </div>
        {errors.confirmPassword && (
          <p className={css.errorText}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={css.registerFormBtn}
      >
        {isSubmitting ? "Registering..." : "Registration"}
      </button>
    </form>
  );
};

export default RegistrationForm;
