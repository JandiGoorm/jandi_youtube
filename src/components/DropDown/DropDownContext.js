import { createContext, useContext } from "react";

export const DropDownContext = createContext({
  onClick: () => {},
  isVisible: false,
  close: () => {},
});

export const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error(
      "useDropDown은 반드시 DropDownProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
