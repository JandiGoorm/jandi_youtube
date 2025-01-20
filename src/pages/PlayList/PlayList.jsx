import { useSearchParams } from "react-router-dom";
import Like from "./Like/Like";
import Later from "./Later/Later";

const PlayListPage = () => {
  const [searchParams] = useSearchParams();
  const listParam = searchParams.get("list");
  return listParam === "LL" ? <Like /> : <Later />;
};

export default PlayListPage;
