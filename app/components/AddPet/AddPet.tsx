"use client";

import Link from "next/link";

const AddPet = () => {
  return (
    <Link href="/add-pet">
      <button>Add Pet</button>
    </Link>
  );
};

export default AddPet;
