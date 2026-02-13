import { Notice } from "@/app/lib/api";
import NoticesItem from "../NoticesItem/NoticesItem";
import css from "./NoticeList.module.css";

type Props = {
  notices: Notice[];
};

const NoticeList = ({ notices }: Props) => {
  return (
    <ul className={css.noticeList}>
      {notices.map((notice) => (
        <NoticesItem key={notice._id} notice={notice} />
      ))}
    </ul>
  );
};

export default NoticeList;
