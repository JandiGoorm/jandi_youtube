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
      ...video,
      channelInfo: channelInfo ? channelInfo.snippet : null,
    };
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
      part: "snippet,statistics,contentDetails",
      id: channelId,
    },
  });
};


const fetchChannel = async (maxResults = 10, channelId) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELS, {
    params: {
      part: "snippet, statistics, brandingSettings",
      id: channelId,
      maxResults,
    },
  });
};

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

const fetchChannelPlayIists = async (
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

const fetchChannelSections = async (channelId) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELSECTIONS, {
    params: {
      part: "contentDetails,id,snippet",
      channelId: channelId,
    },
  });
};

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

const fetchSubscritionsRecentVideos = async (channels, nextPageToken = []) => {
  const result = channels.map((v, i) => {
    return fetchChannelPlayIists(v, 10, nextPageToken[i]);
  });

  return await Promise.all(result);
};

const fetchChannelVideos = async (maxResults = 10, channelId) => {
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
      id: Id,
    },
  });
};

const YoutubeService = {
  fetchVideos,
  fetchPlayLists,
  fetchSubscriptions,
  fetchChannel,
  fetchAllSubscriptions,
  fetchSubscritionsRecentVideos,
  fetchDetailVideos,
  fetchChannelSections,
  fetchChannelVideos,
  fetchVideoDetails,
  fetchPlaylistItems,
};

export default YoutubeService;
