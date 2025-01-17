import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageEndPoints } from "./constants/api";
import AuthProvider from "./contexts/AuthProvider";
import ChannelPage from "./pages/Channel/Channel";
import HomePage from "./pages/Home/Home";
import LoadingPage from "./pages/Loading/Loading";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import ShortsPlayer from "./pages/ShortsPlayer/ShortsPlayer";
import FeedplayListsPage from "./pages/Feed/PlayLists/PlayLists";
import FeedChannelsPage from "./pages/Feed/Channels/Channels";
import FeedSubscriptionsPage from "./pages/Feed/Subscriptions/Subscriptions";
import ResultsPage from "./pages/Results/Results";
import SubscriptionsProvider from "./contexts/SubscriptionsProvider";
import Like from "./pages/Like/Like";

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
            <Route path={PageEndPoints.PLAYLIST} element={<Like />} />
            <Route path={PageEndPoints.CHANNEL} element={<ChannelPage />} />
            <Route
              path={PageEndPoints.FEEDPLAYLISTS}
              element={<FeedplayListsPage />}
            />
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
