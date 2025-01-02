import axios from "axios";
import { YOUTUBE_API_KEY } from "../constants/config";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
});

instance.defaults.params = {};
instance.defaults.params["key"] = YOUTUBE_API_KEY;

const fetchVideos = async (maxResults = 10) => {
  return await instance.get("/search", {
    params: {
      part: "snippet",
      chart: "mostPopular",
      type: "video",
      regionCode: "KR",
      maxResults,
    },
  });
};

const YoutubeService = {
  fetchVideos,
};

export default YoutubeService;
