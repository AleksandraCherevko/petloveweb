import { Notice } from "@/app/lib/api";
import NoticesItem from "../NoticesItem/NoticesItem";

type Props = {
  notices: Notice[];
};

const NoticeList = ({ notices }: Props) => {
  return (
    <ul>
      {notices.map((notice) => (
        <NoticesItem key={notice._id} item={notice} />
      ))}
    </ul>
  );
};

export default NoticeList;
