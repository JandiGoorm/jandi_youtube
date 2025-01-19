import React, { useState } from "react";
import styles from "./CommentsModal.module.css";
import { RiFilter2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";

const CommentModal = ({ isOpen, onClose, children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortByPopularity, setIsSortByPopularity] = useState(true); //true: 인기순, false: 최신순

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const setSortByPopularity = () => {
    setIsSortByPopularity(true);
    setIsDropdownOpen(false);
    console.log("인기순 정렬 선택");
  }
  
  const setSortByLatest = () => {
    setIsSortByPopularity(false);
    setIsDropdownOpen(false);
    console.log("최신순 정렬 선택");
  }

  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <p>댓글</p>
          <div className={styles.filterContainer}>
            <button onClick={toggleDropdown}><RiFilter2Fill /></button>
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownMenuBtn} onClick={setSortByPopularity}>인기 댓글순</button>
                <button className={styles.dropdownMenuBtn} onClick={setSortByLatest}>최신순</button>
              </div>
            )}
          </div>
          <button onClick={onClose}><TfiClose /></button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default CommentModal;