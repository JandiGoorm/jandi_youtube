import { useEffect, useState } from "react";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../components/DropDown/DropDown";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import styles from "./Channels.module.css";
import youtubeService from "../../apis/youtube";
import ChannelDes from "./ChannelDes";
import { channelsOrder } from "../../constants/channel";
// import ArrowDownIcon from "../../components/Icons/ArrowDownIcon";

const initialOptions = {
  label: "관련성순",
  value: "relevance",
};

const FeedChannelsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [options, setOptions] = useState(initialOptions);
  const [isLoading, setIsLoading] = useState(false);

  const { fetchSubscriptions } = youtubeService;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchSubscriptions(10, options.value);

        const detils = data.map((v) => {
          return {
            ...v.snippet,
            ...v.statistics,
          };
        });

        setSubscriptions(detils);
      } catch (err) {
        console.error("구독채널 불러오기 Api Error :", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchSubscriptions, options.value]);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.header}>모든 구독 채널</h1>
          <DropDown>
            <DropDownTrigger>
              <button className={styles.option_btn}>
                <span>{options.label}</span>
                {/* <ArrowDownIcon
                  width={18}
                  height={18}
                  style={{
                    position: "relative",
                    top: "1px",
                  }}
                /> */}
              </button>
            </DropDownTrigger>
            <DropDownContent>
              <div className={styles.options}>
                {channelsOrder.map((option) => {
                  return (
                    <button
                      key={option.label}
                      onClick={() => {
                        setOptions(option);
                      }}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </DropDownContent>
          </DropDown>

          <div
            className={styles.channels_container}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            {subscriptions.map((channel) => {
              return <ChannelDes channel={channel} key={channel.customUrl} />;
            })}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeedChannelsPage;
