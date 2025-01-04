import { DropDownContext } from "./DropDownContext";
import { useDropDown } from "./DropDownContext";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./DropDown.module.css";

const DropDown = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  const handleClickTrigger = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropDownContext.Provider
      value={{
        onClick: handleClickTrigger,
        isVisible,
        close,
      }}
    >
      <div className={styles.container} ref={ref}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children }) => {
  const { onClick } = useDropDown();

  return (
    <div onClick={onClick} className={styles.trigger}>
      {children}
    </div>
  );
};

const DropDownContent = ({ children }) => {
  const { isVisible, close } = useDropDown();

  return (
    <div className={styles.relative}>
      <div
        className={styles.content}
        style={{
          display: isVisible ? "block" : "none",
        }}
        onClick={close}
      >
        {children}
      </div>
    </div>
  );
};

export { DropDown, DropDownTrigger, DropDownContent };
