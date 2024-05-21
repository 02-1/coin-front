import axios from "axios";

// const dataList = [
//   {
//     id: 1,
//     img_link: "https://static.upbit.com/logos/BTC.png",
//     ticker: "BTC",
//     name: "비트코인",
//   },
//   {
//     id: 2,
//     img_link: "https://static.upbit.com/logos/ETH.png",
//     ticker: "ETH",
//     name: "이더리움",
//   },
//   {
//     id: 3,
//     img_link: "https://static.upbit.com/logos/DOGE.png",
//     ticker: "DOGE",
//     name: "도지코인",
//   },
//   {
//     id: 4,
//     img_link: "https://static.upbit.com/logos/SHIB.png",
//     ticker: "SHIB",
//     name: "시바이누",
//   },
// ];

let dataList = null;

export async function getDataList() {
  const response = await fetch(`http://${process.env.REACT_APP_IP}/coin-list`);
  const body = await response.json();
  return body;
}

export async function getCoinList() {
  if (!dataList) {
    dataList = await getDataList();
  }
  const exchange = await getExchangeRate();
  const updatedDataList = await Promise.all(
    dataList.map(async (e) => {
      const price_bithumb = await getPriceBithumb(e["ticker"]);
      const price_binance = (await getPriceBinance(e["ticker"])) * exchange;
      const price_gap = price_bithumb - price_binance;
      const gap_percent = (price_gap / price_bithumb) * 100;
      return {
        ...e,
        price_bithumb,
        price_binance,
        price_gap,
        gap_percent,
      };
    })
  );
  return updatedDataList;
}

async function getPriceBithumb(ticker) {
  try {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const response = await fetch(
      `https://api.bithumb.com/public/ticker/${ticker}_KRW`,
      options
    );
    const data = await response.json();
    if (data && data.data.closing_price !== undefined) {
      return parseFloat(data.data.closing_price);
    } else {
      return 0;
    }
  } catch (err) {
    console.err(err);
    return 0;
  }
}

async function getPriceBinance(ticker) {
  try {
    const res = await axios.get(`https://api.binance.com/api/v3/avgPrice`, {
      params: {
        symbol: ticker + "USDT",
      },
    });
    const data = res.data;
    if (data && data.price !== undefined) {
      return parseFloat(data.price);
    } else {
      return 0;
    }
  } catch (err) {
    console.err(err);
    return 0;
  }
}

export async function getExchangeRate() {
  try {
    const response = await fetch(
      `http://${process.env.REACT_APP_IP}/exchange-rate`
    );
    const body = await response.json();
    return body.exchangeRate;
  } catch {
    console.log("환율 내놔");
    return 1000;
  }
  //return 1070;
}
