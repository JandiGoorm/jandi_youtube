import { apiEndPoints } from "../constants/api";
import youtubeAPI from "./youtubeInstance";

const fetchSearch = async (params) => {
  return await youtubeAPI.get(apiEndPoints.SEARCH, {
    params,
  });
};

const fetchVideos = async (params) => {
  return await youtubeAPI.get(apiEndPoints.VIDEOS, {
    params,
  });
};

const fetchPlayLists = async (params) => {
  return await youtubeAPI.get(apiEndPoints.PLAYLISTS, {
    params,
  });
};

const fetchPlaylistItems = async (params) => {
  return await youtubeAPI.get(apiEndPoints.PLAYLISTSITEMS, {
    params,
  });
};

const fetchChannels = async (params) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELS, {
    params,
  });
};

const fetchSubscriptions = async (params) => {
  return await youtubeAPI.get(apiEndPoints.SUBSCRIPTIONS, {
    params,
  });
};

const fetchChannelSections = async (params) => {
  return await youtubeAPI.get(apiEndPoints.CHANNELSECTIONS, {
    params,
  });
};

const fetchAllSubscriptions = async () => {
  const response = await fetchSubscriptions({
    part: "snippet,contentDetails",
    mine: true,
    maxResults: 50,
    order: "relevance",
  });

  const subscriptions = response.data.items;
  const channelIds = subscriptions.map((v) => v.snippet.resourceId.channelId);

  const channelsResponse = await fetchChannels({
    part: "snippet,statistics,contentDetails",
    id: channelIds.join(","),
  });

  const hash = {};
  channelsResponse.data.items.forEach((v) => {
    hash[v.id] = v;
  });

  const data = channelIds.map((id) => {
    return hash[id];
  });

  let nextPageToken = response.data.nextPageToken;
  const clone = data;

  while (nextPageToken) {
    const nextResponse = await fetchSubscriptions({
      part: "snippet,contentDetails",
      mine: true,
      maxResults: 50,
      pageToken: nextPageToken,
    });

    clone.push(...nextResponse.data);
    nextPageToken = nextResponse.response.data.nextPageToken;
  }

  return clone;
};

const YoutubeService = {
  fetchSearch,
  fetchVideos,
  fetchPlayLists,
  fetchPlaylistItems,
  fetchChannels,
  fetchSubscriptions,
  fetchChannelSections,
  fetchAllSubscriptions,
};

export default YoutubeService;
