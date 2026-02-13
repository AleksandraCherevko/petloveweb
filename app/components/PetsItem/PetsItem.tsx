"use client";

import { Pet } from "../AuthProvider/AuthProvider";
// import { useState } from "react";
// import toast from "react-hot-toast";
import Image from "next/image";

type Props = {
  pet: Pet;
  //   onDelete: (id: string) => void;
};

// const PetsItem = ({ pet
//  }: Props) => {
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = async () => {
//     if (!confirm(`Delete ${pet.name}?`)) return;

//     setIsDeleting(true);
//     try {
//       const res = await fetch(`/api/users/current/pets/remove/${pet._id}`, {
//         method: "DELETE",
//         credentials: "include", // важно для httpOnly cookie
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         toast.error(data.message || "Failed to delete pet");
//         setIsDeleting(false);
//         return;
//       }

//       toast.success(`${pet.name} deleted`);
//       onDelete(pet._id);
//     } catch {
//       toast.error("Server error");
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <li>
//       {pet.imgURL && (
//         <Image
//           src={pet.imgURL}
//           alt={pet.name || "Pet"}
//           width={200}
//           height={200}
//         />
//       )}
//       <h3>{pet.name}</h3>
//       <p>{pet.title}</p>
//       <p>{pet.species}</p>
//       <p>{pet.sex}</p>
//       <p>{pet.birthday}</p>
//       <button onClick={handleDelete} disabled={isDeleting}>
//         {isDeleting ? "Deleting..." : "🗑 Delete"}
//       </button>
//     </li>
//   );
// };

// export default PetsItem;
const PetsItem = ({ pet }: Props) => {
  const handleDelete = async () => {
    const res = await fetch(`/api/users/current/pets/remove/${pet._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) window.location.reload(); // или вызвать refetchUser для SPA-подхода
  };

  return (
    <li>
      <Image
        src={pet.imgURL || "/placeholder.png"}
        alt={pet.name}
        width={100}
      />
      <h3>{pet.name}</h3>
      <p>{pet.title}</p>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default PetsItem;
