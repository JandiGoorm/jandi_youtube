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

const YoutubeService = {
  fetchVideos,
  fetchPlayLists,
};

export default YoutubeService;
