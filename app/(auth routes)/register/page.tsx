import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import Link from "next/link";
import Title from "@/app/components/Title/Title";
import PetBlock from "@/app/components/PetBlock/PetBlock";

const RegisterPage = () => {
  return (
    <div>
      <PetBlock
        mobileSrc="/images/registration/registrationMobile.jpg"
        tabletSrc="/images/registration/registrationTablet.jpg"
        desktopSrc="/images/registration/registrationDesktop.jpg"
        alt="Orange cat"
        priority
      />
      <Title as="h2">Registration</Title>
      <RegistrationForm />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
