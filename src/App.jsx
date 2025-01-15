import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { pageEndPoints } from "./constants/api";
import AuthProvider from "./contexts/AuthProvider";
import ChannelPage from "./pages/Channel/Channel";
import HomePage from "./pages/Home/Home";
import LoadingPage from "./pages/Loading/Loading";
import TestPage from "./pages/Test/Test";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import FeedChannelsPage from "./pages/Feed/Channels/Channels";
import FeedSubscriptionsPage from "./pages/Feed/Subscriptions/Subscriptions";
import ResultsPage from "./pages/Results/Results";
import SubscriptionsProvider from "./contexts/SubscriptionsProvider";

function App() {
  return (
    <AuthProvider>
      <SubscriptionsProvider>
        <Router>
          <Routes>
            <Route path={pageEndPoints.HOME} element={<HomePage />} />
            <Route path={pageEndPoints.LOADING} element={<LoadingPage />} />
            <Route
              path={pageEndPoints.FEEDCHANNELS}
              element={<FeedChannelsPage />}
            />
            <Route path="/watch" element={<VideoPlayer />} />
            <Route path={pageEndPoints.CHANNEL} element={<ChannelPage />} />
            <Route path={pageEndPoints.TEST} element={<TestPage />} />
            <Route
              path={pageEndPoints.FEEDSUBSCRIPTIONS}
              element={<FeedSubscriptionsPage />}
            />
            <Route path="/watch" element={<VideoPlayer />} />
            <Route path={pageEndPoints.RESULTS} element={<ResultsPage />} />
          </Routes>
        </Router>
      </SubscriptionsProvider>
    </AuthProvider>
  );
}

export default App;
