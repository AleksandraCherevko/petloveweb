"use client";

import { useState } from "react";
import { Pet } from "@/app/lib/api";
import PetsItem from "../PetsItem/PetsItem";
import css from "./PetsList.module.css";

type Props = {
  pets: Pet[];
  onPetsChanged: () => Promise<void> | void;
};

const PetsList = ({ pets: initialPets, onPetsChanged }: Props) => {
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const handleDeleted = async (id: string) => {
    setPets((prev) => prev.filter((pet) => pet._id !== id));
    await onPetsChanged();
  };

  return (
    <ul className={css.petsList}>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} onDeleted={handleDeleted} />
      ))}
    </ul>
  );
};

export default PetsList;
