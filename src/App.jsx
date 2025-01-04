import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import LoadingPage from "./pages/Loading/Loading";
import ChannelPage from "./pages/Channel/Channel";
import AuthProvider from "./contexts/AuthProvider";
import { pageEndPoints } from "./constants/api";
import TestPage from "./pages/Test/Test";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={pageEndPoints.HOME} element={<HomePage />} />
          <Route path={pageEndPoints.LOADING} element={<LoadingPage />} />
          {/* <Route
            path={pageEndPoints.MYSUBSCRIPTIONS}
            element={<FeedChannelsPage />}
          /> */}
          <Route path={pageEndPoints.CHANNEL} element={<ChannelPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
