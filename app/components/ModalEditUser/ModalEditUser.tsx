"use client";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import css from "./ModalEditUser.module.css";
import Image from "next/image";
import { useEffect } from "react";
import Title from "../Title/Title";
import clsx from "clsx";

interface ModalEditUserProps {
  onClose: () => void;
  onSuccess: () => void;
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
  const [previewError, setPreviewError] = useState(false);
  const [localPreview, setLocalPreview] = useState("");
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const {
    register,
    handleSubmit,
    control,
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
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to update user");
        setIsSubmitting(false);
        return;
      }

      toast.success("User updated successfully");
      onSuccess();
      onClose();
    } catch {
      toast.error("Server error, please try again");
      setIsSubmitting(false);
    }
  }
  const avatarValue = useWatch({ control, name: "avatar" });
  const previewSrc =
    localPreview || (avatarValue && !previewError ? avatarValue : "");
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" className={css.closeBtnIcon}>
            <use href="/symbol-defs.svg#icon-cross-black" />
          </svg>
        </button>
        <Title as="h3" className={css.formTitle}>
          Edit information
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={css.imageBlock}>
            <div className={css.imagePreview}>
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt="Avatar preview"
                  width={68}
                  height={68}
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className={css.imagePreviewIconWrapp}>
                  <svg width="34" height="34" className={css.imagePreviewIcon}>
                    <use href="/symbol-defs.svg#icon-user" />
                  </svg>
                </div>
              )}
            </div>
            <div className={css.imageRow}>
              <div className={css.errorWrap}>
                <input
                  placeholder="Avatar URL"
                  {...register("avatar")}
                  className={css.imageRowInput}
                  onChange={() => {
                    setPreviewError(false);
                    setLocalPreview("");
                  }}
                />
                {errors.avatar && (
                  <p className={css.error}>{errors.avatar.message}</p>
                )}
              </div>
              <div className={css.uploadBtnWrap}>
                <label className={css.uploadBtn}>
                  Upload photo
                  <svg width="16" height="16" className={css.uploadPhotoIcon}>
                    <use href="/symbol-defs.svg#icon-upload-cloud" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setPreviewError(false);
                      setLocalPreview(URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={css.inputWrap}>
            <div className={css.errorWrap}>
              <input
                placeholder="Name"
                {...register("name")}
                className={css.input}
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>
            <div className={css.errorWrap}>
              <input
                placeholder="Email"
                {...register("email")}
                className={css.input}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.errorWrap}>
              <input
                placeholder="Phone number"
                {...register("phone")}
                className={css.input}
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
            </div>

            <div className={css.actions}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(css.actionsSubmit, css.actionsBtn)}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
