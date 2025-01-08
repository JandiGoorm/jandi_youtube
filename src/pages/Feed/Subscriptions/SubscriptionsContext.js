import { createContext, useContext } from "react";

export const SubscriptionsContext = createContext({
  allSubs: [],
  setAllSubs: () => {},
});

export const useSubscriptions = () => {
  const context = useContext(SubscriptionsContext);
  if (!context) {
    throw new Error(
      "useSubsCriptions는 반드시 SubscriptionsProvider 내부에서 사용되어야 합니다."
    );
  }

  return context;
};
