import React from "react";
import styles from "./CommentsModal.module.css"; 
import { RiFilter2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <header>
          <p>댓글</p>
          <button ><RiFilter2Fill /></button>
          <button onClick={onClose}><TfiClose /></button>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;