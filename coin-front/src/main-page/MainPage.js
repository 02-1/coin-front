import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";
import "./css/MainPage.css";
import Loading from "../common/component/Loading";
import { getCoinList, getExchangeRate } from "./MainPageFetch";
import Option from "./component/Option";

function MainPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [order, setOrder] = useState({
    upbit: null,
    binance: null,
    gap: null,
    percent: null,
  });
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [rating, setRating] = useState(0);

  const getList = async () => {
    try {
      const ratingData = await getExchangeRate();
      setRating(ratingData[0].exchangeRate);
    } catch {
      console.log("환율 데이터를 가져올 수 없습니다.");
    }
    try {
      const newList = await getCoinList();
      setList(newList);
      setLoading(false);
    } catch {
      console.log("서버 연결 안되는뎁..");
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    try{
      const filteredList = list.filter((item) => {
        const tickerMatch = item.ticker
          .toLowerCase()
          .includes(search.toLowerCase());
        const nameMatch = item.name.toLowerCase().includes(search.toLowerCase());
        return tickerMatch || nameMatch;
      });
  
      setFilteredList(filteredList);
    }catch{
      console.log("서버 오류났다구")
    }
    
  }, [search, list]);

  useEffect(() => {
    
    const nonNullKey = Object.keys(order).find(key => order[key] !== null);
    const orderType = nonNullKey || null;

    if (orderType !== null) {
      filteredList.sort((a, b) => {
        switch (orderType) {
          case "upbit":
            return order[orderType] === "asc"
              ? a["price_upbit"].localeCompare(b["price_upbit"])
              : b["price_upbit"].localeCompare(a["price_upbit"]);
          case "binance":
            return order[orderType] === "asc"
              ? a["price_binance"].localeCompare(b["price_binance"])
              : b["price_binance"].localeCompare(a["price_binance"]);
          case "gap":
            return order[orderType] === "asc"
              ? a["price_gap"] - b["price_gap"]
              : b["price_gap"] - a["price_gap"];
          case "percent":
            return order[orderType] === "asc"
              ? a["formattedGapPercent"] - b["formattedGapPercent"]
              : b["formattedGapPercent"] - a["formattedGapPercent"];
          default:
            return 0;
        }
      });
    }
  }, [order, filteredList]);

  useEffect(() => {
    let intervalId;

    if (autoRefreshEnabled) {
      intervalId = setInterval(() => {
        getList();
        console.log("새로고침");
      }, 10000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [autoRefreshEnabled]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="table-container">
        <Option
          autoRefreshEnabled={autoRefreshEnabled}
          setAutoRefreshEnabled={setAutoRefreshEnabled}
          rating={rating}
        />
        <TableOfContents order={order} setOrder={setOrder} />
        {loading && <Loading />}
        {!loading && <TableList list={filteredList} />}
      </div>
    </>
  );
}

export default MainPage;
