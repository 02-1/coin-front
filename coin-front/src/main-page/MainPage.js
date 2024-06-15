import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";
import "./css/MainPage.css";
import Loading from "../common/component/Loading";
import {
  getCoinList,
  getExchangeRate,
  getCoinListMostView,
} from "./MainPageFetch";
import Option from "./component/Option";
import Cookies from "js-cookie";
import TestPage from "../a/test";
import { ImCog } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";
import ReactSlider from "react-slider";

function MainPage() {
  const [isRefreshPopupOpen, setIsRefreshPopupOpen] = useState(false);
  const [isChartPopupOpen, setIsChartPopupOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(
    parseInt(Cookies.get("refreshInterval"), 10) || "0"
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
  const [top, setTop] = useState([]);

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

      const mostViewedData = await getCoinListMostView();
      setTop(mostViewedData); // 가장 많이 본 데이터를 배열로 설정
      console.log("----------------");
      console.log(mostViewedData);
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
        getList();
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
      Cookies.set("autoMode", autoMode, { expires: 7 });
      Cookies.set("values", values, { expires: 7 });
      setIsRefreshPopupOpen(false);
      setErrorMessage("");
      window.location.reload();
    } else {
      setErrorMessage("새로고침 시간 설정 오류");
    }
  };

  const [values, setValues] = useState(() => {
    const cookieValues = Cookies.get("values");
    if (cookieValues) {
      return cookieValues.split(",").map(parseFloat);
    } else {
      return [0, 0];
    }
  });

  const [autoMode, setAutoMode] = useState(() => {
    const cookieAutoMode = Cookies.get("autoMode");
    if (cookieAutoMode === "false") {
      return false;
    } else {
      return true;
    }
  });

  const handleChange = (newValues) => {
    setValues(newValues);
  };
  return (
    <>
      <div className="setting-container">
        <div className="btn-setting-container">
          <button className="setting" onClick={handleChartButtonClick}>
            김프 차트
          </button>
          <button className="setting" onClick={handleRefreshButtonClick}>
            <ImCog />
          </button>
        </div>

        <div className="top-view">
          {top.map((crypto, index) => (
            <div key={crypto.id} className="top-item">
              <p>{index + 1}. </p>
              <img src={crypto.img_link} alt={crypto.name} />
              <p>{crypto.name}</p>
              <p className="count">{crypto.view_count}회</p>
            </div>
          ))}
        </div>
      </div>

      <SearchBar search={search} setSearch={setSearch} />
      <div className="table-container">
        <Option exchange={exchange} />
        <TableOfContents order={order} setOrder={setOrder} />
        {loading && <Loading />}
        {!loading && (
          <TableList list={sortedList} autoMode={autoMode} options={values} />
        )}
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
            <h5>새로고침 설정</h5>
            <input
              className="refresh"
              type="number"
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              placeholder="Enter seconds"
            />
            <div className="SliderPage">
              <h5>
                코인 정보 색 설정 (
                <label>
                  auto:
                  <input
                    type="checkbox"
                    checked={autoMode}
                    onChange={(e) => setAutoMode(e.target.checked)}
                  />
                </label>
                )
              </h5>

              <div className="slider-container">
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  min={-2}
                  max={5}
                  step={0.01}
                  value={values}
                  onChange={handleChange}
                  renderThumb={(props, state) => (
                    <div {...props}>
                      <div className="thumb-value">
                        {state.valueNow.toFixed(2)}
                      </div>
                    </div>
                  )}
                  // renderTrack={({ index, ...props }, state) => {
                  //   const trackColors = ["blue", "yellow", "orange"];
                  //   return (
                  //     <div
                  //       {...props}
                  //       className={`example-track example-track-${index}`}
                  //       style={{ backgroundColor: trackColors[index] }}
                  //     />
                  //   );
                  // }}
                />

                <div className="value-boxes">
                  <div className="value-box">min</div>
                  <div className="value-box">max</div>
                </div>
              </div>
              <p>
                - auto로 설정 시 음수는 회색, 주황색은 평균 이하, 빨간색은 평균
                이상으로 설정됩니다.
                <br />- 새로고침 시간은 0이나 10s이상으로 설정해야합니다.
              </p>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <button className="save" onClick={handleSave}>
                Save
              </button>
            </div>
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
