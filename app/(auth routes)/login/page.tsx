import Link from "next/link";
import Title from "@/app/components/Title/Title";
import PetBlock from "@/app/components/PetBlock/PetBlock";
import css from "./page.module.css";
import Container from "@/app/components/Container/Container";
import Image from "next/image";
import LoginForm from "@/app/components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className={css.loginPageWrapper}>
      <Container className={css.loginPageContainerWrapper}>
        <div className={css.loginPageContainer}>
          <div className={css.petBlockWrapper}>
            <PetBlock
              className={css.petBlockLoginImg}
              mobileSrc="/images/login/loginMobile.jpg"
              tabletSrc="/images/login/loginTablet.jpg"
              desktopSrc="/images/login/loginDesktop.jpg"
              alt="Funny dog"
            />
            <div className={css.petBlockOverlay}>
              <Image
                className={css.petBlockOverlayImg}
                src="/images/login/loginRichInfo.jpg"
                width={294}
                height={121}
                alt="Small overlay about Rich dog"
              />
            </div>
          </div>
          <div className={css.loginFormContainer}>
            <Title as="h2" className={css.loginTitle}>
              Log in
            </Title>
            <p className={css.loginAfterTitle}>
              Welcome! Please enter your credentials to login to the platform:
            </p>
            <LoginForm />
            <p className={css.loginAfterFormText}>
              Don’t have an account?
              <Link href="/register" className={css.loginFormLoginReroutLink}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
