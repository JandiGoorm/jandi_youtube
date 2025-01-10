import { useEffect, useState } from "react";
import YoutubeService from "../../../apis/youtube";
import { SubscriptionsContext } from "./SubscriptionsContext";

const SubscriptionsProvider = ({ children }) => {
  const [allSubs, setAllSubs] = useState([]);
  const { fetchAllSubscriptions } = YoutubeService;

  useEffect(() => {
    (async () => {
      const subs = await fetchAllSubscriptions();
      setAllSubs(() => {
        return subs;
      });
    })();
  }, [fetchAllSubscriptions]);

  return (
    <SubscriptionsContext.Provider value={{ allSubs, setAllSubs }}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

export default SubscriptionsProvider;
