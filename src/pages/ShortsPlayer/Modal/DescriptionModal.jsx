import React, {useState, useEffect} from "react";
import styles from "./DescriptionModal.module.css";

//util 함수
import { formatISO } from "../../../utils/date.js";
import { formatLikeCount } from "../../../utils/likeCount.js";
import { formatHitCount } from "../../../utils/hit.js";

//버튼 아이콘
import { TfiClose } from "react-icons/tfi";


const Modal = ({ isOpen, onClose, shortsData }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  const handleOverlayClick = (e) => {
    // 모달창 외부 영역을 클릭한 경우 모달창 닫기
    if (e.target.className.includes("modalOverlay")) {
      onClose();
    }
  };

  return (
    <div 
      className={styles.modalOverlay}
      onClick={handleOverlayClick} 
    >
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <p>설명</p>
          <button onClick={onClose}>
            <TfiClose />
          </button>
        </header>
        <main className={styles.descriptionModalMain}>
            {" "}
            {shortsData.videoTitle}
          </main>
          <article className={styles.descriptionModalArticle}>
            <section className={styles.descriptionModalSection}>
              <p>{formatLikeCount(shortsData.likeCount)}</p>
              <p>좋아요 수</p>
            </section>
            <section className={styles.descriptionModalSection}>
              <p>{formatHitCount(shortsData.viewCount).split(" ", 1)}</p>
              <p>조회수</p>
            </section>
            <section className={styles.descriptionModalSection}>
              <p>{formatISO(shortsData.publishTime).split(" ", 1)}</p>
              <p>전</p>
            </section>
          </article>
          <footer className={styles.descriptionModalFooter}>
            {shortsData.description}
          </footer>
      </div>
    </div>
  );
};

export default Modal;
