import Container from "../components/Container/Container";
import Title from "../components/Title/Title";
import css from "./page.module.css";
import { getNotices } from "../lib/api";
import NoticeList from "../components/NoticesList/NoticesList";

const Notices = async () => {
  const response = await getNotices();

  return (
    <div className={css.noticesPageContainer}>
      <Container>
        <Title as="h2" className={css.noticesPageTitle}>
          Find your favorite pet
        </Title>
        {response?.results?.length > 0 && (
          <NoticeList notices={response.results} />
        )}
      </Container>
    </div>
  );
};
export default Notices;
