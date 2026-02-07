import RegistrationForm from "@/app/components/RegistrationForm/RegistrationForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2>Registration</h2>
      <RegistrationForm />
      <p style={{ marginTop: 10 }}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
