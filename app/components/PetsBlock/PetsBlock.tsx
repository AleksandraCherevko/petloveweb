"use client";

// import { useEffect, useState } from "react";
import { Pet } from "../AuthProvider/AuthProvider";
import PetsList from "../PetsList/PetsList";
// import Loader from "../Loader/Loader";

// const PetsBlock = () => {
//   const [pets, setPets] = useState<Pet[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPets = async () => {
//     try {
//       const user = await getUser(); // авторизация через httpOnly cookie
//       setPets(user.pets || []);
//     } catch (err) {
//       console.error(err);
//       setPets([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPets();
//   }, []);

//   if (loading) return <Loader progress={0} />;

//   if (pets.length === 0) return <p>No pets yet</p>;

//   return <PetsList pets={pets} />;
// };

// export default PetsBlock;
interface Props {
  pets: Pet[];
}

export const PetsBlock = ({ pets }: Props) => {
  if (!pets.length)
    return (
      <p>
        {"Oops, looks like there aren't any furries on our adorable page yet. "}
        {
          'Do not worry! View your pets on the "find your favorite pet" page and add them to your favorites.'
        }
      </p>
    );
  return <PetsList pets={pets} />;
};
