//import WebSocketClient from "./WebSocket";
import MainPage from "./main-page/MainPage";
import DetailPage from "./detail-page/DetailPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<MainPage />} />
        {/* <상세페이지 /> */}
        <Route path="/details" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
