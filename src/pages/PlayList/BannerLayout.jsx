import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import styles from "./BannerLayout.module.css";
import { BannerLayoutContext } from "./BannerLayoutContext";

const BannerLayout = ({ children }) => {
  return (
    <BannerLayoutContext.Provider>
      <DefaultLayout>
        <div className={styles.container}>{children}</div>
      </DefaultLayout>
    </BannerLayoutContext.Provider>
  );
};

const Banner = ({ children }) => {
  return <div className={styles.banner_container}>{children}</div>;
};

const Content = ({ children }) => {
  return <ul className={styles.content_container}>{children}</ul>;
};

export { BannerLayout, Banner, Content };
