export const pageEndPoints = {
  HOME: "/", // 메인 페이지
  LOADING: "/loading", // 로딩 페이지
  MYSUBSCRIPTIONS: "/feed/channels", // 모든 구독 채널 페이지
  CHANNEL: "/channel/:channel", //채널 페이지
  TEST: "/test", // 테스트 페이지
};

export const apiEndPoints = {
  TOKEN: "/token",
  SEARCH: "/search",
  PLAYLISTS: "/playlists",
  SUBSCRIPTIONS: "/subscriptions",
  CHANNELS: "/channels",
};

export const authRequiredRoutes = [
  apiEndPoints.PLAYLISTS,
  apiEndPoints.SUBSCRIPTIONS,
];
