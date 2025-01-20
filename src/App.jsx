import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageEndPoints } from "./constants/api";
import AuthProvider from "./contexts/AuthProvider";
import SubscriptionsProvider from "./contexts/SubscriptionsProvider";
import ChannelPage from "./pages/Channel/Channel";
import FeedChannelsPage from "./pages/Feed/Channels/Channels";
import FeedplayListsPage from "./pages/Feed/PlayLists/PlayLists";
import FeedSubscriptionsPage from "./pages/Feed/Subscriptions/Subscriptions";
import HomePage from "./pages/Home/Home";
import LoadingPage from "./pages/Loading/Loading";
import ResultsPage from "./pages/Results/Results";
import ShortsPlayer from "./pages/ShortsPlayer/ShortsPlayer";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import PlayListPage from "./pages/PlayList/PlayList";

function App() {
  return (
    <AuthProvider>
      <SubscriptionsProvider>
        <Router>
          <Routes>
            <Route path={PageEndPoints.HOME} element={<HomePage />} />
            <Route path={PageEndPoints.LOADING} element={<LoadingPage />} />
            <Route path={PageEndPoints.CHANNEL} element={<ChannelPage />} />
            <Route path={PageEndPoints.RESULTS} element={<ResultsPage />} />
            <Route path={PageEndPoints.CHANNEL} element={<ChannelPage />} />

            <Route
              path={PageEndPoints.FEEDPLAYLISTS}
              element={<FeedplayListsPage />}
            />
            <Route path={PageEndPoints.PLAYLIST} element={<PlayListPage />} />
            <Route
              path={PageEndPoints.FEEDCHANNELS}
              element={<FeedChannelsPage />}
            />
            <Route
              path={PageEndPoints.FEEDSUBSCRIPTIONS}
              element={<FeedSubscriptionsPage />}
            />

            <Route
              path={PageEndPoints.SHORTSDETAIL}
              element={<ShortsPlayer />}
            />
            <Route path={PageEndPoints.WATCH} element={<VideoPlayer />} />
          </Routes>
        </Router>
      </SubscriptionsProvider>
    </AuthProvider>
  );
}

export default App;
