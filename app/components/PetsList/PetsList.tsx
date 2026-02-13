"use client";

import { Pet } from "../AuthProvider/AuthProvider";
// import { useState } from "react";
import PetsItem from "../PetsItem/PetsItem";

type Props = {
  pets: Pet[];
};

// const PetsList = ({ pets: initialPets }: Props) => {
//   const [pets, setPets] = useState<Pet[]>(initialPets);

//   const handleDelete = (id: string) => {
//     setPets(pets.filter((pet) => pet._id !== id));
//   };

//   return (
//     <ul>
//       {pets.map((pet) => (
//         <PetsItem key={pet._id} pet={pet} onDelete={handleDelete} />
//       ))}
//     </ul>
//   );
// };

const PetsList = ({ pets }: Props) => {
  return (
    <ul>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} />
      ))}
    </ul>
  );
};


export default PetsList;
