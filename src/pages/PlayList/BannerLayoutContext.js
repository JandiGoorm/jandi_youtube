import { createContext, useContext } from "react";

export const BannerLayoutContext = createContext();

export const useBannerLayout = () => {
  const context = useContext(BannerLayoutContext);
  if (!context) {
    throw new Error(
      "useBannerLayout은 반드시 BannerLayoutProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
