import { PageEndPoints } from "../constants/api";
import ChannelPage from "../pages/Channel/Channel";
import FeedChannelsPage from "../pages/Feed/Channels/Channels";
import FeedplayListsPage from "../pages/Feed/PlayLists/PlayLists";
import FeedSubscriptionsPage from "../pages/Feed/Subscriptions/Subscriptions";
import HomePage from "../pages/Home/Home";
import LoadingPage from "../pages/Loading/Loading";
import ResultsPage from "../pages/Results/Results";
import ShortsPlayer from "../pages/ShortsPlayer/ShortsPlayer";
import VideoPlayer from "../pages/VideoPlayer/VideoPlayer";
import PlayListPage from "../pages/PlayList/PlayList";

export const routes = [
  {
    path: PageEndPoints.HOME,
    element: <HomePage />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.LOADING,
    element: <LoadingPage />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.CHANNEL,
    element: <ChannelPage />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.RESULTS,
    element: <ResultsPage />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.PLAYLIST,
    element: <PlayListPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.FEEDPLAYLISTS,
    element: <FeedplayListsPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.FEEDCHANNELS,
    element: <FeedChannelsPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.FEEDSUBSCRIPTIONS,
    element: <FeedSubscriptionsPage />,
    requireAuth: true,
  },
  {
    path: PageEndPoints.SHORTSDETAIL,
    element: <ShortsPlayer />,
    requireAuth: false,
  },
  {
    path: PageEndPoints.WATCH,
    element: <VideoPlayer />,
    requireAuth: false,
  },
];
