"use client";

import { Pet } from "@/app/lib/api";
import PetsList from "../PetsList/PetsList";
import AddPet from "../AddPet/AddPet";
import Title from "../Title/Title";
import css from "./PetsBlock.module.css";

interface Props {
  pets: Pet[];
  onPetsChanged: () => Promise<void> | void;
}

export const PetsBlock = ({ pets, onPetsChanged }: Props) => {
  return (
    <>
      <div className={css.petsBlockWrap}>
        <Title as="h3" className={css.title}>
          My pets
        </Title>
        <AddPet />
      </div>
      {pets.length === 0 ? (
        <p className={css.petsBlockText}>
          Oops,
          <span className={css.petsBlockSpan}>
            looks like there are no pets yet
          </span>
          . Add your first pet.
        </p>
      ) : (
        <PetsList pets={pets} onPetsChanged={onPetsChanged} />
      )}
    </>
  );
};
