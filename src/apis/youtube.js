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

const fetchChannel = async (maxResults = 10) => {
  return await youtubeAPI.get(apiEndPoints.CHANNEL, {
    params: {
      part: "snippet",
      forHandle: "@올타쿠나",
      maxResults,
    }
  })
}

const YoutubeService = {
  fetchVideos,
  fetchPlayLists,
  fetchChannel,
};

export default YoutubeService;
