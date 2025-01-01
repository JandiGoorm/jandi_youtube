import config from './apikey.js';
import axios from 'axios';
const YOUTUBE_API_KEY = config.APIKEY;

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: YOUTUBE_API_KEY, 
  },
});


export default instance;