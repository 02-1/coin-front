import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ko from "date-fns/locale/ko";
import "./css/pastPricePage.css";
import DefaultPage from "../common/default-page/DefaultPage";
import { useLocation } from "react-router-dom";

export default function PastPricePage() {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDate, setFirstDate] = useState(null);
  const [extractedData, setExtractedData] = useState([]);
  const [price, setPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [inputValue, setInputValue] = useState(1); // 사용자 입력값

  const queryParams = new URLSearchParams(location.search);
  const img_link = queryParams.get("img_link");
  const ticker = queryParams.get("ticker");
  const name = queryParams.get("name");
  const rowData = { img_link, ticker, name: decodeURIComponent(name) };

  const handleDateChange = (date) => {
    setSelectedDate(() => date);
    fetchData();
    findDataForSelectedDate();
  };

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://api.bithumb.com/public/candlestick/${rowData.ticker}_KRW/24h`
      );
      const data = res.data.data;
      setExtractedData(data);
      const firstDate = new Date(data[0][0]);
      setFirstDate(firstDate);
      findDataForSelectedDate();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const findDataForSelectedDate = () => {
    const selectedTimestamp = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    ).getTime();

    console.log(`결과:${selectedTimestamp}`);

    const dataForDate = extractedData.find(
      (data) => data[0] === selectedTimestamp
    );
    console.log(dataForDate);

    if (dataForDate) {
      console.log(
        `Data for ${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}:`,
        dataForDate[2],
        "원"
      );
      setPrice(dataForDate[2]);
    } else {
      console.log(
        `No data found for ${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`
      );
    }
    getPrice();
  };

  async function getPrice() {
    try {
      const options = {
        order_currency: `BTC_KRW`,
        method: "GET",
        headers: { accept: "application/json" },
      };
      const response = await fetch(
        `https://api.bithumb.com/public/ticker/${ticker}_KRW`,
        options
      );
      const data = await response.json();
      if (data && data.data.closing_price !== undefined) {
        setCurrentPrice(parseFloat(data.data.closing_price));
      } else {
        console.error("Closing price not found in response data.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  const numberWithCommas = (x) => {
    if (x === null) return "";

    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const numberToKorean = (number) => {
    const units = ["", "만", "억", "조", "경"];
    const splitUnit = 10000;
    const splitCount = units.length;
    const resultArray = [];
    let resultString = "";

    for (let i = 0; i < splitCount; i++) {
      const unitResult =
        (number % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      if (Math.floor(unitResult) > 0) {
        resultArray[i] = Math.floor(unitResult) + units[i];
      }
    }

    resultArray.reverse();
    resultString = resultArray.join(" ");
    return resultString;
  };

  const priceDifference =
    price !== null && currentPrice !== null ? currentPrice - price : null;
  const priceDifferencePercentage =
    price !== null && currentPrice !== null
      ? ((priceDifference / price) * 100).toFixed(2)
      : null;

  const result = priceDifferencePercentage
    ? ((priceDifferencePercentage * inputValue) / 100).toFixed(0)
    : null;

  const dateFormat = (date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    setInputValue(parseInt(value) || 0);
  };

  const getColorStyle = (value) => {
    if (value > 0) return { color: "red" };
    if (value < 0) return { color: "blue" };
    return {};
  };

  return (
    <div>
      <DefaultPage rowData={rowData} />

      <div className="past-price-container">
        <div className="inputs">
          <DatePicker
            className="datePicker"
            dateFormat="yyyy년 MM월 dd일"
            locale={ko}
            selected={selectedDate}
            onChange={handleDateChange}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            minDate={firstDate}
            maxDate={new Date()}
          />
        </div>
        <div className="price-info">
          <div>
            현재가격:{" "}
            {currentPrice !== null
              ? numberWithCommas(currentPrice) + " 원"
              : "Loading..."}
          </div>
          <div>
            {dateFormat(selectedDate)} 가격:{" "}
            {price !== null ? numberWithCommas(price) + " 원" : ""}
          </div>
          {priceDifference !== null && (
            <>
              <div style={getColorStyle(priceDifference)}>
                가격 차이: {numberWithCommas(priceDifference)} 원
              </div>
              <div style={getColorStyle(priceDifferencePercentage)}>
                비율 차이: {priceDifferencePercentage}%
              </div>
            </>
          )}
          <div className="resultContainer">
            {dateFormat(selectedDate)}에
            <span className="column-text">
              <input
                type="text"
                value={numberWithCommas(inputValue)}
                onChange={handleInputChange}
              />{" "}
              ({numberToKorean(inputValue)} 원)
            </span>
            원만큼 샀더라면 현재&nbsp;
            <span style={getColorStyle(priceDifferencePercentage)}>
              {" "}
              <span className="column-text">
                {result < 0
                  ? `${numberWithCommas(result)}원 잃었습니다.`
                  : `${numberWithCommas(result)}원 벌었습니다.`}
                <div>({numberToKorean(result)} 원)</div>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
