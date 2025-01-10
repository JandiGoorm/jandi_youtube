import { useCallback } from "react";
import { IoIosArrowDown } from "react-icons/io";
import youtubeService from "../../../apis/youtube";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";
import ChannelItem from "./ChannelItem";
import styles from "./Channels.module.css";
import { channelOrderDropdownOptions } from "./contants";
import { useLocation, useNavigate } from "react-router-dom";
import { pageEndPoints } from "../../../constants/api";

const FeedChannelsPage = () => {
  const navigate = useNavigate();
  const { fetchSubscriptions, fetchChannels } = youtubeService;

  const { search } = useLocation();
  const optionQuery = new URLSearchParams(search).get("option") || "관련성순";

  const handleOrderClick = useCallback(
    (option) => {
      const parmas = new URLSearchParams({ option });
      navigate(`${pageEndPoints.FEEDCHANNELS}?${parmas.toString()}`);
      window.location.reload();
    },
    [navigate]
  );

  const fetchCallback = async (nextToken = "") => {
    try {
      const response = await fetchSubscriptions({
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 10,
        order: channelOrderDropdownOptions[optionQuery],
        pageToken: nextToken,
      });

      const subscriptions = response.data.items;
      const channelIds = subscriptions.map(
        (v) => v.snippet.resourceId.channelId
      );

      const channelsResponse = await fetchChannels({
        part: "snippet,statistics,contentDetails",
        id: channelIds.join(","),
      });

      const hash = {};

      channelsResponse.data.items.forEach((v) => {
        const channelId = response.data.items.find(
          (v2) => v2.snippet.title === v.snippet.title
        ).snippet.resourceId.channelId;

        hash[v.id] = {
          ...v,
          channelId,
        };
      });

      const data = channelIds.map((id) => {
        return hash[id];
      });

      const detils = data.map((v) => {
        return {
          ...v.snippet,
          ...v.statistics,
          ...v.contentDetails,
          channelId: v.channelId,
        };
      });

      return {
        items: detils,
        nextToken: response.data.nextPageToken,
      };
    } catch (err) {
      console.error("구독채널 불러오기 Api Error :", err);
    }
  };

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.header}>모든 구독 채널</h1>
          <DropDown>
            <DropDownTrigger>
              <button className={styles.option_btn}>
                <span>{optionQuery}</span>
                <IoIosArrowDown className={styles.arrow_down} />
              </button>
            </DropDownTrigger>
            <DropDownContent>
              <div className={styles.options}>
                {Object.entries(channelOrderDropdownOptions).map(([key]) => {
                  return (
                    <button key={key} onClick={() => handleOrderClick(key)}>
                      {key}
                    </button>
                  );
                })}
              </div>
            </DropDownContent>
          </DropDown>

          <div className={styles.channels_container}>
            <InfiniteScroll
              fetch={fetchCallback}
              RenderComponent={ChannelItem}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeedChannelsPage;
