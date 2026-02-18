"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Pet } from "@/app/lib/api";
import css from "./PetsItem.module.css";
import Title from "../Title/Title";

type Props = {
  pet: Pet;
  onDeleted: (id: string) => void;
};

const PetsItem = ({ pet, onDeleted }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const res = await fetch(`/api/users/current/pets/remove/${pet._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.error || "Failed to delete pet");
        return;
      }

      toast.success("Pet deleted");
      onDeleted(pet._id);
    } catch {
      toast.error("Server error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className={css.petsItem}>
      <Image
        className={css.petsItemImg}
        src={pet.imgURL || "/placeholder.png"}
        alt={pet.name}
        width={66}
        height={66}
        unoptimized
      />
      <div className={css.petsInfo}>
        <div className={css.petsTitleWrap}>
          <Title as="h3" className={css.petsTitle}>
            {pet.title || pet.name}
          </Title>
        </div>
        <div className={css.petsValueWrap}>
          <p className={css.petsValue}>
            Name: <span className={css.petsValueSpan}>{pet.name}</span>
          </p>

          <p className={css.petsValue}>
            Birthday:
            <span className={css.petsValueSpan}>{pet.birthday || "-"}</span>
          </p>

          <p className={css.petsValue}>
            Sex: <span className={css.petsValueSpan}>{pet.sex || "-"}</span>
          </p>

          <p className={css.petsValue}>
            Species: <span className={css.petsValueSpan}>{pet.species}</span>
          </p>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={css.petsDeleteBtn}
      >
        <svg className={css.petsIcon} width="16" height="16">
          <use href="/symbol-defs.svg#icon-trash"></use>
        </svg>
      </button>
    </li>
  );
};

export default PetsItem;
