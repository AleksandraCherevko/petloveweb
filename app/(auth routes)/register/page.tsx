import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import Link from "next/link";
import Title from "@/app/components/Title/Title";
import PetBlock from "@/app/components/PetBlock/PetBlock";
import css from "./page.module.css";
import Container from "@/app/components/Container/Container";
import Image from "next/image";
const RegisterPage = () => {
  return (
    <div className={css.registerPageWrapper}>
      <Container>
        <div className={css.registerPageContainer}>
          <div className={css.petBlockWrapper}>
            <PetBlock
              className={css.petBlockRegisterImg}
              mobileSrc="/images/registration/registrationMobile.jpg"
              tabletSrc="/images/registration/registrationTablet.jpg"
              desktopSrc="/images/registration/registrationDesktop.jpg"
              alt="Orange cat"
            />
            <div className={css.petBlockOverlay}>
              <Image
                src="/images/registration/registrationJackInfo.jpg"
                width={294}
                height={121}
                alt="Small overlay about Jack cat"
              />
            </div>
          </div>
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
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
