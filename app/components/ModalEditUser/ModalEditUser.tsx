"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";

interface ModalEditUserProps {
  onClose: () => void;
  onSuccess: () => void; // callback для обновления UserCard
}

type FormValues = {
  name: string;
  email: string;
  avatar: string;
  phone: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    ),
  avatar: yup
    .string()
    .required("Avatar URL is required")
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Invalid image URL",
    ),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+38\d{10}$/, "Phone must match +38XXXXXXXXXX format"),
});

export function ModalEditUser({ onClose, onSuccess }: ModalEditUserProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/users/current/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to update user");
        setIsSubmitting(false);
        return;
      }

      toast.success("User updated successfully");
      onSuccess(); // обновляем UserCard
      onClose(); // закрываем модалку
    } catch {
      toast.error("Server error, please try again");
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input placeholder="Email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input placeholder="Avatar URL" {...register("avatar")} />
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </div>
        <div>
          <input placeholder="Phone" {...register("phone")} />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
