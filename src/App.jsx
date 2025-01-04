import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import MySubscribePage from "./pages/MySubcribe/MySubscribe";
import ChannelPage from "./pages/Channel/Channel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mypage/subscribtions" element={<MySubscribePage />} />
        <Route path="/channel/:channelId" element={<ChannelPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
