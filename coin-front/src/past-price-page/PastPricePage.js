import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ko from "date-fns/locale/ko";
import "./css/pastPricePage.css";
export default function PastPricePage() {
  const [selectedItem, setSelectedItem] = useState("day");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDate, setFirstDate] = useState(null);
  const [extractedData, setExtractedData] = useState([]);
  const [price, setPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [inputValue, setInputValue] = useState(1); // 사용자 입력값

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://api.bithumb.com/public/candlestick/BTC_KRW/24h`
      );
      const data = res.data.data;
      setExtractedData(data);

      const firstDate = new Date(data[0][0]);
      setFirstDate(firstDate);
      console.log(firstDate);
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

    const dataForDate = extractedData.find(
      (data) => data[0] === selectedTimestamp
    );

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
        `https://api.bithumb.com/public/ticker/BTC_KRW`,
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const priceDifference =
    price !== null && currentPrice !== null ? currentPrice - price : null;
  const priceDifferencePercentage =
    price !== null && currentPrice !== null
      ? ((priceDifference / price) * 100).toFixed(2)
      : null;

  const result = priceDifferencePercentage
    ? numberWithCommas(
        ((priceDifferencePercentage * inputValue) / 100).toFixed(0)
      )
    : null;

  return (
    <div className="past-price-container">
      <div className="inputs">
        <DatePicker
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
        <button onClick={findDataForSelectedDate}>확인</button>
      </div>
      <div className="price-info">
        <div>
          현재가격:{" "}
          {currentPrice !== null
            ? numberWithCommas(currentPrice) + " 원"
            : "Loading..."}
        </div>
        <div>
          선택된 날짜의 가격:{" "}
          {price !== null
            ? numberWithCommas(price) + " 원"
            : "No data available for selected date"}
        </div>
        {priceDifference !== null && (
          <>
            <div>가격 차이: {numberWithCommas(priceDifference)} 원</div>
            <div>비율 차이: {priceDifferencePercentage}%</div>
          </>
        )}
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(parseInt(e.target.value))}
        />
        {result !== null && <div>Result: {result}원</div>}
      </div>
    </div>
  );
}
