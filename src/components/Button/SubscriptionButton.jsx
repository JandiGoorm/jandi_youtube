import styles from "./SubscriptionButton.module.css";
import { useSubscriptions } from "../../contexts/SubscriptionsContext";
import { useMemo } from "react";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
} from "../DropDown/DropDown";
import { subscriptionDropdownOptions } from "./constants";
import { BsBell } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";

const SubscriptionButton = ({ channelId }) => {
  const { allSubs, deleteSubscription, addSubscription } = useSubscriptions();
  const isSubscribed = allSubs.some((sub) => sub.id === channelId);

  const renderItem = useMemo(() => {
    if (isSubscribed) {
      return (
        <div className={styles.dropdown}>
          <DropDown>
            <DropDownTrigger>
              <button className={styles.subscribed_btn}>
                <BsBell size={22} />
                <span>구독중</span>
                <SlArrowDown size={12} className={styles.arrow_down} />
              </button>
            </DropDownTrigger>
            <DropDownContent>
              <div className={styles.dropdown_content}>
                {subscriptionDropdownOptions.map((option) => {
                  return (
                    <button
                      key={option.label}
                      onClick={
                        option.label === "구독 취소" &&
                        (() => deleteSubscription(channelId))
                      }
                    >
                      {option.icons}
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </DropDownContent>
          </DropDown>
        </div>
      );
    } else {
      return (
        <button
          className={styles.subs_btn}
          onClick={() => addSubscription(channelId)}
        >
          구독
        </button>
      );
    }
  }, [addSubscription, channelId, deleteSubscription, isSubscribed]);

  return <>{renderItem}</>;
};

export default SubscriptionButton;
