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
  const [sortedList, setSortedList] = useState(filteredList);
  const [order, setOrder] = useState({
    upbit: null,
    binance: null,
    gap: null,
    percent: null,
  });
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [exchange, setExchange] = useState(0);
  const [refreshTime, setRefreshTime] = useState(1);

  const getList = async () => {
    try {
      const exchangeData = await getExchangeRate();
      setExchange(exchangeData);
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
   
      const filteredList = list.filter((item) => {
        const tickerMatch = item.ticker
          .toLowerCase()
          .includes(search.toLowerCase());
        const nameMatch = item.name
          .toLowerCase()
          .includes(search.toLowerCase());
        return tickerMatch || nameMatch;
      });
      setFilteredList(filteredList);
  }, [search, list]);

  useEffect(() => {
    const nonNullKey = Object.keys(order).find((key) => order[key] !== null);
    const orderType = nonNullKey || null;

    if (orderType !== null) {
      const sortedList = [...filteredList].sort((a, b) => {
        switch (orderType) {
          case "upbit":
            return order[orderType] === "asc"
              ? a["price_bithumb"] - b["price_bithumb"]
              : b["price_bithumb"] - a["price_bithumb"];
          case "binance":
            return order[orderType] === "asc"
              ? a["price_binance"] - b["price_binance"]
              : b["price_binance"] - a["price_binance"];
          case "gap":
            return order[orderType] === "asc"
              ? a["price_gap"] - b["price_gap"]
              : b["price_gap"] - a["price_gap"];
          case "percent":
            return order[orderType] === "asc"
              ? a["gap_percent"] - b["gap_percent"]
              : b["gap_percent"] - a["gap_percent"];
          default:
            return 0;
        }
      });
      setSortedList(sortedList);
    }
    else{
      const sortedList = [...filteredList].sort((a,b) => {
        return a["id"]-b["id"]
      })
      setSortedList(sortedList);
    }

  }, [order, filteredList]);

  useEffect(() => {
    let intervalId;

    if (autoRefreshEnabled) {
      intervalId = setInterval(() => {
        getList();
        console.log("새로고침");
      }, 1000 * refreshTime);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [autoRefreshEnabled, refreshTime]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="table-container">
        <Option
          autoRefreshEnabled={autoRefreshEnabled}
          setAutoRefreshEnabled={setAutoRefreshEnabled}
          exchange={exchange}
          refreshTime={refreshTime}
          setRefreshTime={setRefreshTime}
        />
        <TableOfContents order={order} setOrder={setOrder} />
        {loading && <Loading />}
        {!loading && <TableList list={sortedList} />}
      </div>
    </>
  );
}

export default MainPage;
