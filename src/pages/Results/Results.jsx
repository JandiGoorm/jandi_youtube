import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import AllResults from "./AllResults";
import { categories } from "./constansts";
import LongResults from "./LongResults";
import RecentResults from "./ResentResults";
import styles from "./Results.module.css";
import ShortResults from "./ShortsResults";
import ChannelResults from "./ChannelResults";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const option = new URLSearchParams(search).get("option") ?? "전체";
  const query = new URLSearchParams(search).get("query");

  const handleCategoryClick = useCallback(
    (category) => {
      navigate(`/results?query=${query}&option=${category}`);
      window.location.reload();
    },
    [navigate, query]
  );

  const renderComponent = useMemo(() => {
    switch (option) {
      case "전체":
        return <AllResults />;
      case "Shorts":
        return <ShortResults />;
      case "동영상":
        return <LongResults />;
      case "최근에 업로드된 동영상":
        return <RecentResults />;
      case "채널":
        return <ChannelResults />;
      default:
        return <AllResults />;
    }
  }, [option]);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.category_box}>
            {categories.map((category) => {
              return (
                <button
                  className={styles.category_btn}
                  key={category}
                  style={
                    option === category
                      ? { color: "white", backgroundColor: "black" }
                      : {}
                  }
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
          {renderComponent}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ResultsPage;
