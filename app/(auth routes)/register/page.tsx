import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import Link from "next/link";
import Title from "@/app/components/Title/Title";
import PetBlock from "@/app/components/PetBlock/PetBlock";
import css from "./page.module.css";
import Container from "@/app/components/Container/Container";

const RegisterPage = () => {
  return (
    <div className={css.registerPageWrapper}>
      <Container>
        <PetBlock
          className={css.petBlockRegisterImg}
          mobileSrc="/images/registration/registrationMobile.jpg"
          tabletSrc="/images/registration/registrationTablet.jpg"
          desktopSrc="/images/registration/registrationDesktop.jpg"
          alt="Orange cat"
        />
        <div className={css.registrationFormContainer}>
          <Title as="h2" className={css.registerTitle}>
            Registration
          </Title>
          <p className={css.registerAfterTitle}>
            Thank you for your interest in our platform.
          </p>
          <RegistrationForm />
          <p className={css.registerAfterFormText}>
            Already have an account?
            <Link href="/login" className={css.registerFormLoginReroutLink}>
              Login
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
