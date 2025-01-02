import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import MySubscribePage from "./pages/MySubcribe/MySubscribe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mypage/subscribtions" element={<MySubscribePage />} />
      </Routes>
    </Router>
  );
}

export default App;
