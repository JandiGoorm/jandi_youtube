import React from "react";
import styles from "./DescriptionModal.module.css";
import { TfiClose } from "react-icons/tfi";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <p>설명</p>
          <button onClick={onClose}>
            <TfiClose />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
