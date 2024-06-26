//import WebSocketClient from "./WebSocket";
import MainPage from "./main-page/MainPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import PricePage from "./price-page/PricePage";
import DetailPage from "./detail-page/DetailPage";
import NewsPage from "./news-page/NewsPage";
import TestPage from "./a/test";
import PastPricePage from "./past-price-page/PastPricePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={<MainPage />} />
        {/* <코인 시세 페이지 /> */}
        <Route path="/prices" element={<PricePage />} />
        {/* <코인 상세 페이지 /> */}
        <Route path="/details" element={<DetailPage />} />
        {/* <코인 뉴스 페이지 /> */}
        <Route path="/news" element={<NewsPage />} />
        {/* <과거 가격 페이지 /> */}
        <Route path="/past-price" element={<PastPricePage />} />
      </Routes>
    </BrowserRouter>
    // <TestPage/>
  );
}

export default App;
