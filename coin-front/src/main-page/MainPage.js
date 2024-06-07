import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";
import "./css/MainPage.css";
import Loading from "../common/component/Loading";
import { getCoinList, getExchangeRate } from "./MainPageFetch";
import Option from "./component/Option";
import Cookies from "js-cookie";
import TestPage from "../a/test";
import { ImCog } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";

function MainPage() {
  const [isRefreshPopupOpen, setIsRefreshPopupOpen] = useState(false);
  const [isChartPopupOpen, setIsChartPopupOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(
    parseInt(Cookies.get("refreshInterval"), 10) || ""
  );
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [sortedList, setSortedList] = useState([]);
  const [order, setOrder] = useState({
    upbit: null,
    binance: null,
    gap: null,
    percent: null,
  });
  const [exchange, setExchange] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
        .includes(search.toLowerCase().trim());
      const nameMatch = item.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());
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
    } else {
      const sortedList = [...filteredList].sort((a, b) => {
        return a["id"] - b["id"];
      });
      setSortedList(sortedList);
    }
  }, [order, filteredList]);

  useEffect(() => {
    if (!isChartPopupOpen && (refreshInterval === 0 || refreshInterval >= 10)) {
      const interval = setInterval(() => {
        window.location.reload();
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, isChartPopupOpen]);

  const handleRefreshButtonClick = () => {
    setIsRefreshPopupOpen(true);
  };

  const handleChartButtonClick = () => {
    setIsChartPopupOpen(true);
  };

  const handleSave = () => {
    const interval = parseInt(refreshInterval, 10);
    if (interval === 0 || interval >= 10) {
      Cookies.set("refreshInterval", interval, { expires: 7 });
      setIsRefreshPopupOpen(false);
      setErrorMessage("");
    } else {
      setErrorMessage("Refresh interval must be 0 or 10 seconds or more.");
    }
  };

  return (
    <>
      <div className="setting-container">
        <button className="setting" onClick={handleChartButtonClick}>
          김프 차트
        </button>
        <button className="setting" onClick={handleRefreshButtonClick}>
          <ImCog />
        </button>
      </div>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="table-container">
        <Option exchange={exchange} />
        <TableOfContents order={order} setOrder={setOrder} />
        {loading && <Loading />}
        {!loading && <TableList list={sortedList} />}
      </div>
      {isRefreshPopupOpen && (
        <div className="popup">
          <button
            className="close-btn"
            onClick={() => setIsRefreshPopupOpen(false)}
          >
            <MdOutlineCancel />
          </button>
          <div className="popup-content">
            <input
              type="number"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              placeholder="Enter seconds"
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
      {isChartPopupOpen && (
        <div className="popup">
          <div className="popup-chart">
            <button
              className="close-btn-chart"
              onClick={() => setIsChartPopupOpen(false)}
            >
              <MdOutlineCancel />
            </button>
            <div className="popup-content">
              <TestPage />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainPage;
