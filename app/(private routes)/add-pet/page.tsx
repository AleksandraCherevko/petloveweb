import { getPets } from "@/app/lib/api";

const addPetsPage = async () => {
  const pets = await getPets();
  console.log("pets", pets);

  return <div>getPets</div>;
};

export default addPetsPage;
