import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import Link from "next/link";
import Title from "@/app/components/Title/Title";
const RegisterPage = () => {
  return (
    <div>
      <Title as="h2">Registration</Title>
      <RegistrationForm />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
