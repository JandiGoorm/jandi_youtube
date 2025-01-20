import React, { useState, useEffect } from "react";
import styles from "./DefaultLayout.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { IoReorderThreeOutline } from "react-icons/io5";

const DefaultLayout = function ({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(240); // 기본 사이드바 너비
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const handleMoreBtnClick = () => {
    setIsShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setSidebarWidth(screenWidth <= 1312 ? 72 : 240); // 화면 크기에 따라 너비 설정
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 설정

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={styles.sidebarBtnBackground}>
        <button
          className={styles.sidebarBtn}
          onClick={handleMoreBtnClick}>
          <IoReorderThreeOutline />
        </button>
      </div>
      <Header />
      <div className={styles.main} style={{ marginLeft: sidebarWidth }}>
        <div
          className={styles.sidebar}
          style={{ width: sidebarWidth }}>
          {isShowSidebar && <Sidebar />}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
