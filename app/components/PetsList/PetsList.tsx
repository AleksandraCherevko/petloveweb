// "use client";

// import { Pet } from "@/app/lib/api";
// // import { useState } from "react";
// import PetsItem from "../PetsItem/PetsItem";

// type Props = {
//   pets: Pet[];
// };

// // const PetsList = ({ pets: initialPets }: Props) => {
// //   const [pets, setPets] = useState<Pet[]>(initialPets);

// //   const handleDelete = (id: string) => {
// //     setPets(pets.filter((pet) => pet._id !== id));
// //   };

// //   return (
// //     <ul>
// //       {pets.map((pet) => (
// //         <PetsItem key={pet._id} pet={pet} onDelete={handleDelete} />
// //       ))}
// //     </ul>
// //   );
// // };

// const PetsList = ({ pets }: Props) => {
//   return (
//     <ul>
//       {pets.map((pet) => (
//         <PetsItem key={pet._id} pet={pet} />
//       ))}
//     </ul>
//   );
// };

// export default PetsList;

"use client";

import { useState } from "react";
import { Pet } from "@/app/lib/api";
import PetsItem from "../PetsItem/PetsItem";

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
    <ul>
      {pets.map((pet) => (
        <PetsItem key={pet._id} pet={pet} onDeleted={handleDeleted} />
      ))}
    </ul>
  );
};

export default PetsList;
