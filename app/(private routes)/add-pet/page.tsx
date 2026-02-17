import Container from "@/app/components/Container/Container";
import PetBlock from "@/app/components/PetBlock/PetBlock";
import AddPetForm from "@/app/components/AddPetForm/AddPetForm";
import css from "./page.module.css";

export default function AddPetPage() {
  return (
    <div className={css.addPetPage}>
      <Container className={css.addPetPageContainer}>
        <div className={css.layout}>
          <PetBlock
            className={css.petBlock}
            mobileSrc="/images/add-pet/addPetMobile.jpg"
            tabletSrc="/images/add-pet/addPetTablet.jpg"
            desktopSrc="/images/add-pet/addPetDesktop.jpg"
            alt="Dog with glasses"
          />
          <AddPetForm />
        </div>
      </Container>
    </div>
  );
}
