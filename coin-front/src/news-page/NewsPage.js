import { useLocation } from "react-router-dom";
import DefaultPage from "../common/default-page/DefaultPage";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsRow from "./component/NewsRow";
import Loading from "../common/component/Loading";

function NewsPage(keyword) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const img_link = queryParams.get("img_link");
  const ticker = queryParams.get("ticker");
  const name = queryParams.get("name");

  const rowData = { img_link, ticker, name: decodeURIComponent(name) };

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://${process.env.REACT_APP_IP}/coin-news?symbol=${rowData.ticker}&offset=${offset}&limit=${limit}`
      );
      const extractedData = res.data.records.map((record) => ({
        thumbnailImage: record.thumbnailImage,
        link: record.link,
        publishAt: record.publishAt,
        nameKo: record.source.nameKo,
        title: record.title,
      }));
      setNewsList((prevNewsList) => [...prevNewsList, ...extractedData]); // 기존 데이터에 새로운 데이터 추가
      setOffset((prevOffset) => prevOffset + limit); // offset 값 증가
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleScroll() {
      const pageHeight = document.documentElement.scrollHeight;
      const scrollHeight = window.innerHeight + window.scrollY;

      if (scrollHeight >= pageHeight - 20 && !loading) {
        //  setOffset((offset) => offset + limit);
        fetchData();
        console.log("요청!");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]); // loading 상태 변경 시에만 실행
  return (
    <div>
      <DefaultPage rowData={rowData} />

      {newsList.map((news, index) => (
        <NewsRow key={index} news={news}></NewsRow>
      ))}

      {loading && <Loading></Loading>}
    </div>
  );
}

export default NewsPage;
