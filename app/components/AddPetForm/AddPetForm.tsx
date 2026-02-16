"use client";

import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import css from "./AddPetForm.module.css";
import Title from "../Title/Title";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSpeciesClient } from "@/app/lib/api";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { StylesConfig } from "react-select";

type Option = { value: string; label: string };

type FormValues = {
  title: string;
  name: string;
  imgURL?: string;
  species: string;
  birthday: string;
  sex: "male" | "female" | "multiple" | "unknown";
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  imgURL: yup
    .string()
    .required("Image URL is required")
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i,
      "Image URL must be a valid image link",
    ),
  species: yup.string().required("Species is required"),
  birthday: yup
    .string()
    .required("Birthday is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Use format YYYY-MM-DD"),
  sex: yup
    .mixed<FormValues["sex"]>()
    .oneOf(["male", "female", "multiple", "unknown"], "Select sex")
    .required("Sex is required"),
});

export default function AddPetForm() {
  const router = useRouter();
  const [previewError, setPreviewError] = useState(false);
  const [localPreview, setLocalPreview] = useState<string>("");
  const [speciesOptions, setSpeciesOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const run = async () => {
      const data = await getSpeciesClient();
      setSpeciesOptions(
        data.map((s) => ({
          value: s,
          label: s.charAt(0).toUpperCase() + s.slice(1),
        })),
      );
    };
    void run();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { sex: "male" },
  });

  const imgUrlValue = useWatch({ control, name: "imgURL" });
  const previewSrc =
    localPreview || (imgUrlValue && !previewError ? imgUrlValue : "");

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/users/current/pets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error || data?.message || "Failed to add pet");
        return;
      }

      toast.success("Pet added");
      router.push("/profile");
    } catch {
      toast.error("Server error");
    }
  };

  //   SELECT STYLES

  const typesSelectStyles: StylesConfig<Option, false> = {
    container: (base) => ({
      ...base,
      width: "100%",
    }),
    control: (base, state) => ({
      ...base,

      minHeight: 42,
      height: 42,
      boxSizing: "border-box",
      borderRadius: 30,
      border: state.isFocused
        ? "1px solid var(--accent-color)"
        : "1px solid rgba(38, 38, 38, 0.15)",
      boxShadow: "none",
      paddingLeft: 10,
      paddingRight: 10,
      "&:hover": {
        border: "1px solid rgba(38, 38, 38, 0.25)",
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
      width: "100%",
      overflow: "hidden",
    }),

    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),

    placeholder: (base) => ({
      ...base,
      color: "#26262680",
      fontSize: 14,
      whiteSpace: "nowrap",
    }),

    singleValue: (base) => ({
      ...base,
      color: "var(--title-color)",
      fontSize: 14,
      fontWeight: 500,
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (base, state) => ({
      ...base,
      color: "rgba(38, 38, 38, 0.6)",
      transition: "transform 0.2s ease",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      "&:hover": {
        color: "var(--accent-color)",
      },
    }),

    menu: (base) => ({
      ...base,
      marginTop: 8,
      borderRadius: 15,
      border: "1px solid rgba(38, 38, 38, 0.08)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      overflow: "hidden",
      zIndex: 20,
    }),

    menuList: (base) => ({
      ...base,
      paddingTop: 6,
      paddingBottom: 6,
      maxHeight: 220,
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "rgba(246, 184, 61, 0.15)"
        : state.isFocused
          ? "var(--hover-focus-small-btn)"
          : "#fff",
      color: "var(--title-color)",
      fontSize: 14,
      cursor: "pointer",
      ":active": {
        backgroundColor: "var(--accent-coloror)",
      },
    }),
  };

  return (
    <div className={css.addPetFormContainer}>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.formTitleWrap}>
          <Title as="h2" className={css.formTitle}>
            Add my pet/
          </Title>
          <p className={css.formAfterTitle}>Personal details</p>
        </div>

        {/* RADIO BTNS SEX */}
        <div className={css.sexRow}>
          <label className={css.sexOption}>
            <input
              type="radio"
              value="female"
              {...register("sex")}
              className={css.sexInput}
            />
            <span className={clsx(css.sexIconWrap, css.sexIconWrapFemale)}>
              <svg width="20" height="20">
                <use href="/symbol-defs.svg#icon-female" />
              </svg>
            </span>
          </label>
          <label className={css.sexOption}>
            <input
              type="radio"
              value="male"
              {...register("sex")}
              className={css.sexInput}
            />
            <span className={clsx(css.sexIconWrap, css.sexIconWrapMale)}>
              <svg width="20" height="20">
                <use href="/symbol-defs.svg#icon-male" />
              </svg>
            </span>
          </label>
          <label className={css.sexOption}>
            <input
              type="radio"
              value="multiple"
              {...register("sex")}
              className={css.sexInput}
            />
            <span className={clsx(css.sexIconWrap, css.sexIconWrapDuo)}>
              <svg width="20" height="20">
                <use href="/symbol-defs.svg#icon-duo" />
              </svg>
            </span>
          </label>
        </div>

        {/* IMAGE */}

        <div className={css.imageBlock}>
          <div className={css.imagePreview}>
            {previewSrc ? (
              <Image
                src={previewSrc}
                alt="Pet preview"
                width={68}
                height={68}
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className={css.imagePreviewIconWrapp}>
                <svg width="34" height="34" className={css.imagePreviewIcon}>
                  <use href="/symbol-defs.svg#icon-cat-footprint" />
                </svg>
              </div>
            )}
          </div>

          <div className={css.imageRow}>
            <div className={css.errorWrap}>
              <input
                placeholder="Enter URL"
                {...register("imgURL")}
                className={css.imageRowInput}
                onChange={() => {
                  setPreviewError(false);
                  setLocalPreview("");
                }}
              />
              {errors.imgURL && (
                <p className={css.error}>{errors.imgURL.message}</p>
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

        <div className={css.addPetsInputWrap}>
          <div className={css.errorWrap}>
            <input
              placeholder="Title"
              {...register("title")}
              className={css.addPetsInput}
            />
            {errors.title && (
              <p className={css.error}>{errors.title.message}</p>
            )}
          </div>
          <div className={css.errorWrap}>
            <input
              placeholder="Pet’s Name"
              {...register("name")}
              className={css.addPetsInput}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
          <div className={css.inputWrapperSearch}>
            <div className={css.errorWrap}>
              <div className={css.inputWrapperCalendar}>
                <input
                  placeholder="0000.00.00"
                  {...register("birthday")}
                  className={css.addPetsInput}
                />

                <svg width="16" height="16" className={css.inputIconCalendar}>
                  <use href="/symbol-defs.svg#icon-calendar" />
                </svg>
              </div>

              {errors.birthday && (
                <p className={css.error}>{errors.birthday.message}</p>
              )}
            </div>

            <div className={clsx(css.speciesSelectWrap, css.errorWrap)}>
              <Controller
                control={control}
                name="species"
                render={({ field }) => (
                  <Select
                    instanceId="add-pet-species"
                    options={speciesOptions}
                    styles={typesSelectStyles}
                    classNamePrefix="add-pet-species"
                    placeholder="Type of pet"
                    value={
                      speciesOptions.find((o) => o.value === field.value) ??
                      null
                    }
                    onChange={(opt) => field.onChange(opt?.value ?? "")}
                    onBlur={field.onBlur}
                    isSearchable={false}
                  />
                )}
              />
              {errors.species && (
                <p className={css.error}>{errors.species.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className={clsx(css.actionsBack, css.actionsBtn)}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(css.actionsSubmit, css.actionsBtn)}
          >
            {isSubmitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
