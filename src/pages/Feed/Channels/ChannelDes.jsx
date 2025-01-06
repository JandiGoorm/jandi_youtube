import { BsBell } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import {
  formatDescriptionText,
  formatSubscriberCount,
} from "../../../utils/channel";
import styles from "./ChannelDes.module.css";
import { subscriptionDropdownOptions } from "./contants";

const ChannelDes = ({ channel }) => {
  const flattendDes = formatDescriptionText(channel.description, 70).slice(
    0,
    2
  );

  return (
    <div className={styles.container}>
      <img
        src={channel.thumbnails.medium.url}
        alt="channel"
        className={styles.channel_img}
      />
      <div className={styles.channel_info}>
        <span>{channel.title}</span>
        <div className={styles.channel_description}>
          <div className={styles.channel_stats}>
            <span>{channel.customUrl}</span>
            <span>•</span>
            <span>구독자 {formatSubscriberCount(channel.subscriberCount)}</span>
          </div>
          <div className={styles.des_text_container}>
            {flattendDes.map((text) => {
              return (
                <div key={text} className={styles.des_text}>
                  {text}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.dropdown}>
        <DropDown>
          <DropDownTrigger>
            <button className={styles.subscribe_btn}>
              <BsBell size={22} />
              <span>구독중</span>
              <SlArrowDown size={12} className={styles.arrow_down} />
            </button>
          </DropDownTrigger>
          <DropDownContent>
            <div className={styles.dropdown_content}>
              {subscriptionDropdownOptions.map((option) => {
                return (
                  <button key={option.label}>
                    {option.icons}
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </DropDownContent>
        </DropDown>
      </div>
    </div>
  );
};

export default ChannelDes;