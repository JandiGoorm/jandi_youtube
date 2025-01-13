import { apiEndPoints } from "../constants/api";
import youtubeAPI from "./youtubeInstance";

const fetchVideos = async (maxResults = 10) => {
  const response = await youtubeAPI.get(apiEndPoints.SEARCH, {
    params: {
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      regionCode: "KR",
      maxResults,
    },
  });

  //채널 프로필 이미지를 불러오기 위해 channels api를 요청
  const videos = response.data.items;
  const channelIds = videos.map((video) => video.snippet.channelId);
  const channelResponse = await fetchChannelDetails(channelIds.join(","));
  const channels = channelResponse.data.items;

  const result = videos.map((video) => {
    const channelInfo = channels.find(
      (channel) => channel.id === video.snippet.channelId
    );
    return {
      ...video
      ,channelInfo: channelInfo ? channelInfo.snippet : null,
    }
  });

  return { data: result };
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

const fetchPlaylistItems = async (maxResults = 10, Id) => {
  return await youtubeAPI.get(apiEndPoints.PLAYLISTS, {
    params: {
      part: "snippet,contentDetails",
      maxResults,
      playlistId: Id,
    },
  });
};

const fetchChannelDetails = async (channelId) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELS, {
    params: {
      part: "snippet,statistics",
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
const fetchSubscriptions = async (maxResults = 20, order = "relevance") => {
  const response = await youtubeAPI.get(apiEndPoints.SUBSCRIPTIONS, {
    params: {
      part: "snippet",
      mine: true,
      maxResults,
      order,
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

  return { data: result };
};

const fetchChannel = async (maxResults = 10, channelHandle) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELS, {
    params: {
      part: "snippet, statistics, brandingSettings",
      forHandle: channelHandle,
      maxResults,
    },
  });
};

const fetchChannelSections = async (channelId) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELSECTIONS, {
    params: {
      part: "contentDetails,id,snippet",
      channelId: channelId,
    },
  });
};

const fetchChannelVideos = async (maxResults = 10,channelId) => {
  return await youtubeAPI.get(apiEndPoints.SEARCH, {
    params: {
      part: "snippet",
      type: "video",
      channelId: channelId,
      regionCode: "KR",
      order: "date",
      maxResults,
    },
  });
};

const fetchVideoDetails = async (Id) => {
  return await youtubeAPI.get(apiEndPoints.VIDEOS, {
    params: {
      part: "contentDetails,snippet,statistics",
      id: Id
    },
  });
};

const fetchShorts = async (shortsId) => {
  return await youtubeAPI.get(apiEndPoints.VIDEOS, {
    params: {
      part: "snippet,contentDetails,statistics",
      id: shortsId,
    },
  });
};
const YoutubeService = {
  fetchVideos,
  fetchPlayLists,
  fetchSubscriptions,
  fetchChannel,
  fetchChannelSections,
  fetchChannelVideos,
  fetchVideoDetails,
  fetchPlaylistItems,
  fetchShorts, // 추가
};



export default YoutubeService;
