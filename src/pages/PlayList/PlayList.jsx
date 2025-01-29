import { useSearchParams } from "react-router-dom";
import Like from "./Like/Like";
import Later from "./Later/Later";
import { useMemo } from "react";
import DetailList from "./DetailList/DetailList";

const PlayListPage = () => {
  const [searchParams] = useSearchParams();
  const listParam = searchParams.get("list");

  const renderItem = useMemo(() => {
    if (listParam === "LL") return <Like />;
    if (listParam === "WL") return <Later />;
    return <DetailList id={listParam} />;
  }, [listParam]);

  return renderItem;
};

export default PlayListPage;
