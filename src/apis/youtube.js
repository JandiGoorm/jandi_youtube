import { apiEndPoints } from "../constants/api";
import youtubeAPI from "./youtubeInstance";

const fetchVideos = async (maxResults = 10) => {
  return await youtubeAPI.get(apiEndPoints.SEARCH, {
    params: {
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      regionCode: "KR",
      maxResults,
    },
  });
};

const fetchPlayLists = async (maxResults = 10) => {
  return await youtubeAPI.get(apiEndPoints.PLAYLISTS, {
    params: {
      part: "snippet",
      lanuage: "ko",
      mine: true,
      maxResults,
    },
  });
};

const fetchChannelDetails = async (channelId) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELS, {
    params: {
      part: "snippet,statistics,contentDetails",
      id: channelId,
    },
  });
};

//해당 api요청으론 구독 채널의 모든 정보를 가져올 수 없습니다.
//더 자세한 정보를 위해 한번더 channels api를 요청합니다.
//비동기 처리에서 발생하는 이슈)
//channelIds를 가져온후 fetchChannelDetails를 호출하면 순서가 보장되지 않습니다.
//promise.all을 사용하면 순서가 보장되지만 api요청을 여러번 보내기 때문에 비효율적입니다.
//응답을 return 하는 방식에서 벗어나지만 한번의 요청으로 모든 정보를 가져오기 위해, 다음과 같이 구현합니다.
const fetchSubscriptions = async (
  maxResults = 20,
  order = "relevance",
  nextPageToken = ""
) => {
  const response = await youtubeAPI.get(apiEndPoints.SUBSCRIPTIONS, {
    params: {
      part: "snippet,contentDetails",
      mine: true,
      maxResults,
      order,
      pageToken: nextPageToken,
    },
  });

  const subscriptions = response.data.items;
  const channelIds = subscriptions.map((v) => v.snippet.resourceId.channelId);
  const channelsResponse = await fetchChannelDetails(channelIds.join(","));

  const hash = {};
  channelsResponse.data.items.forEach((v) => {
    hash[v.id] = v;
  });

  const result = channelIds.map((id) => {
    return hash[id];
  });

  return { data: result, response };
};

const fetchChannel = async (maxResults = 10) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELS, {
    params: {
      part: "snippet",
      forHandle: "@올타쿠나",
      maxResults,
    },
  });
};

const fetchAllSubscriptions = async () => {
  const { data, response } = await fetchSubscriptions(10);
  let nextPageToken = response.data.nextPageToken;
  const subscriptions = data;

  while (nextPageToken) {
    const nextResponse = await fetchSubscriptions(10, undefined, nextPageToken);
    subscriptions.push(...nextResponse.data);
    nextPageToken = nextResponse.response.data.nextPageToken;
  }

  return subscriptions;
};

/**
 * 해당 채널의 영상을 가져옵니다.
 * @param {string} channelId
 * @param {string} period
 * @returns
 */
const fetchChannelVideos = async (
  channelId,
  maxResults = 10,
  nextPageToken = ""
) => {
  return youtubeAPI.get(apiEndPoints.PLAYLISTSITEMS, {
    params: {
      part: "snippet,contentDetails",
      playlistId: channelId,
      maxResults,
      pageToken: nextPageToken,
    },
  });
};

/**
 *
 * @param {string[]} videosId
 * @returns {Promise}
 */
const fetchDetailVideos = async (videosId) => {
  const temp = [];
  for (let i = 0; i < videosId.length; i += 50) {
    temp.push(videosId.slice(i, i + 50));
  }

  const responses = temp.map((videos) => {
    return youtubeAPI.get(apiEndPoints.VIDEOS, {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videos.join(","),
      },
    });
  });

  return await Promise.all(responses);
};

/**
 * 전체 구독채널의 최신 영상을 가져옵니다.
 * period는 일 단위입니다.
 * @param {string[]} channels
 * @param {number} period
 * @returns
 */
const fetchSubscritionsRecentVideos = async (channels, nextPageToken = []) => {
  const result = channels.map((v, i) => {
    return fetchChannelVideos(v, 10, nextPageToken[i]);
  });

  return await Promise.all(result);
};

const YoutubeService = {
  fetchVideos,
  fetchPlayLists,
  fetchSubscriptions,
  fetchChannel,
  fetchAllSubscriptions,
  fetchSubscritionsRecentVideos,
  fetchDetailVideos,
};

export default YoutubeService;
