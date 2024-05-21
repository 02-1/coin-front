import axios from "axios";

const items = {
  분봉: "1m",
  시봉: "1h",
  일봉: "24h",
};

const interval = {
  분봉: "1m",
  시봉: "1h",
  일봉: "1d",
};

const getInitialDataList = async ({
  selectedItem,
  selectedLocation,
  ticker,
}) => {
  try {
    let arr;
    if (selectedLocation === "국내") {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      const res = await axios.get(
        `https://api.bithumb.com/public/candlestick/${ticker}_KRW/${
          selectedLocation === "국내" ? items[selectedItem] : ""
        }`,
        options
      );
      const data = res.data.data;
      arr = data.map((item) => {
        return {
          open: item[1],
          low: item[4],
          high: item[3],
          close: item[2],
          volume: parseFloat(item[5]),
          timestamp:
            selectedItem === "일봉"
              ? Math.floor(item[0] / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000
              : Math.floor(item[0] / (60 * 1000)) * (60 * 1000),
          turnover: ((item[1] + item[3] + item[2] + item[4]) / 4) * item[5],
        };
      });
      return arr;
    } else {
      let rating = 1366.91;
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_IP}/exchange-rate`
        );
        const body = await response.json();
        rating = body.exchangeRate;
      } catch {
        console.log("환율 데이터를 가져올 수 없습니다.");
      }
      const res = await axios.get(
        `https://api.binance.com/api/v3/klines${
          selectedLocation === "국내" ? items[selectedItem] : ""
        }`,
        {
          params: {
            symbol: ticker + "USDT",
            interval: interval[selectedItem],
            limit: 1000,
          },
        }
      );
      const data = res.data;
      arr = data.map((item) => {
        return {
          open: item[1] * rating,
          low: item[3] * rating,
          high: item[2] * rating,
          close: item[4] * rating,
          volume: item[5] * rating,
          timestamp:
            selectedItem === "일봉"
              ? Math.floor(item[0] / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000
              : Math.floor(item[0] / (60 * 1000)) * (60 * 1000),
          turnover:
            ((item[1] + item[3] + item[2] + item[4]) / 4) * item[5] * rating,
        };
      });
      return arr;
    }
  } catch (err) {
    console.error(err);
  }
};

export default getInitialDataList;
