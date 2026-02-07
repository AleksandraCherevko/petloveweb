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
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    ),
  password: yup
    .string()
    .required("Password is required")
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
    } catch  {
      setBackendError("Server error, please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      
    >
      <div style={{ marginBottom: 10 }}>
        <label>Name</label>
        <input type="text" {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <input type="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Registration"}
      </button>

      {backendError && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#fdd",
            color: "#900",
            borderRadius: 5,
          }}
        >
          {backendError}
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
