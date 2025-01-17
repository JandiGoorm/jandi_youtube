import { useCallback, useEffect, useState } from "react";
import YoutubeService from "../apis/youtube";
import { SubscriptionsContext } from "./SubscriptionsContext";

const SubscriptionsProvider = ({ children }) => {
  const [allSubs, setAllSubs] = useState([]);
  const { fetchAllSubscriptions } = YoutubeService;

  const deleteSubscription = useCallback(async (id) => {
    setAllSubs((prev) => {
      return prev.filter((sub) => sub.id !== id);
    });
  }, []);

  const addSubscription = useCallback(async (id) => {
    setAllSubs((prev) => {
      return [...prev, { id }];
    });
  }, []);

  useEffect(() => {
    (async () => {
      const subs = await fetchAllSubscriptions();
      setAllSubs(subs);
    })();
  }, [fetchAllSubscriptions]);

  return (
    <SubscriptionsContext.Provider
      value={{ allSubs, setAllSubs, deleteSubscription, addSubscription }}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
};

export default SubscriptionsProvider;
