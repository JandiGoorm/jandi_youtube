import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import MySubscribePage from "./pages/MySubcribe/MySubscribe";
<<<<<<< HEAD
import ChannelPage from "./pages/Channel/Channel";
=======
import ChannelPage from "./pages/Channel/Channel"
>>>>>>> main

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mypage/subscribtions" element={<MySubscribePage />} />
<<<<<<< HEAD
        <Route path="/channel/:channelId" element={<ChannelPage />} />
        
=======
        <Route path="/@:channelId" element={<ChannelPage />} />
>>>>>>> main
      </Routes>
    </Router>
  );
}

export default App;
