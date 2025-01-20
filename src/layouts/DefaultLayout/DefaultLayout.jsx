import React, { useCallback, useEffect, useState } from "react";
import styles from "./DefaultLayout.module.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const DefaultLayout = function ({ children }) {
  const [sidebarWidth, setSidebarWidth] = useState(240); // 기본 사이드바 너비
  const [isShowSidebar, setIsShowSidebar] = useState(true); //사이드바 표시 여부

  const handleMoreBtnClick = () => {
    setIsShowSidebar((prev) => !prev);
  };

  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const width = screenWidth <= 1312 ? 72 : 240; // 화면 크기에 따라 너비 설정
    if (isShowSidebar) {
      setSidebarWidth(width);
    }
  }, [isShowSidebar]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize, isShowSidebar]);

  return (
    <>
      <Header menuCallback={handleMoreBtnClick} />
      <div
        className={styles.main}
        style={{ marginLeft: isShowSidebar ? sidebarWidth : 0 }}
      >
        <div
          className={styles.sidebar}
          style={{ width: isShowSidebar ? sidebarWidth : 0 }}
        >
          {isShowSidebar && <Sidebar />}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
