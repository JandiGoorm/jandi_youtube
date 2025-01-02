import styles from "./DefaultLayout.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const DefaultLayout = function ({ children }) {
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
