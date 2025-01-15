import { DropDownContext } from "./DropDownContext";
import { useDropDown } from "./DropDownContext";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./DropDown.module.css";

const DropDown = ({ children, style = {} }) => {
  const [isVisible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const contentRef = useRef(null);

  const handleClickTrigger = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const updatePosition = useCallback(() => {
    if (!ref.current || !contentRef.current || !isVisible) return;

    const triggerRect = ref.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    if (viewportHeight - triggerRect.bottom >= contentRect.height) {
      top = 0;
    } else {
      top = -contentRect.height - triggerRect.height - 8;
    }

    if (viewportWidth - triggerRect.left >= contentRect.width) {
      left = 0;
    } else {
      left = -(contentRect.width - triggerRect.width);
    }

    setPosition({ top, left });
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isVisible, updatePosition]);

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
        contentRef,
        position,
      }}
    >
      <div className={styles.container} ref={ref} style={style}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children, style = {} }) => {
  const { onClick } = useDropDown();

  return (
    <div onClick={onClick} className={styles.trigger} style={style}>
      {children}
    </div>
  );
};

const DropDownContent = ({ children }) => {
  const { isVisible, close, contentRef, position } = useDropDown();

  return (
    <div className={styles.relative}>
      <div
        ref={contentRef}
        className={styles.content}
        style={{
          display: isVisible ? "block" : "none",
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onClick={close}
      >
        {children}
      </div>
    </div>
  );
};

export { DropDown, DropDownTrigger, DropDownContent };
