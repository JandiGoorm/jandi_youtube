export const pageEndPoints = {
  HOME: "/", // 메인 페이지
  LOADING: "/loading", // 로딩 페이지
  CHANNEL: "/channel/:channel", //채널 페이지
  TEST: "/test", // 테스트 페이지
  FEEDHISTORY: "/feed/history", // 내 시청 목록 페이지
  FEEDCHANNELS: "/feed/channels", // 모든 구독 채널 페이지
  FEEDSUBSCRIPTIONS: "/feed/subscriptions", // 구독 채널 동영상 페이지
};

export const apiEndPoints = {
  TOKEN: "/token",
  SEARCH: "/search",
  PLAYLISTS: "/playlists",
  CHANNELPLAYLISTS: "/playlists",
  PLAYLISTSITEMS: "/playlistItems",
  SUBSCRIPTIONS: "/subscriptions",
  CHANNELS: "/channels",
  ACTIVITIES: "/activities",
  VIDEOS: "/videos",
  CHANNELSECTIONS: "/channelSections",
};

export const authRequiredRoutes = [
  // apiEndPoints.PLAYLISTS,
  apiEndPoints.SUBSCRIPTIONS,
];
