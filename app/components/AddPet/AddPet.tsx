"use client";

import Link from "next/link";
import css from "./AddPet.module.css";

const AddPet = () => {
  return (
    <Link href="/add-pet">
      <button className={css.addPetBtn}>
        Add Pet <span>&#43;</span>
      </button>
    </Link>
  );
};

export default AddPet;
