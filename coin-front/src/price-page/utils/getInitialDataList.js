import axios from "axios"

const items = {
  "분봉" : "minutes/1",
  "일봉" : "days",
  "월봉" : "months"
}

const interval = {
  "분봉" : "1m",
  "일봉" : "1d",
  "월봉" : "1M"
}


const getInitialDataList = async ({selectedItem, selectedLocation, market}) => {
  try {
    let arr;
    if(selectedLocation === "국내"){
      const res = await axios.get(`https://api.upbit.com/v1/candles/${selectedLocation === "국내" ?items[selectedItem] : ''}`
      , {
        params: {
          market: "KRW-" + market,
          to: new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, ''),
          count: 200
        }
      });
      const data = res.data;
      arr = data.map((item) => {
      const { opening_price, low_price, high_price, trade_price, timestamp, candle_acc_trade_volume } = item;
      return {
        open: opening_price,
        low: low_price,
        high: high_price,
        close: trade_price,
        volume: candle_acc_trade_volume,
        timestamp: selectedItem === "일봉" ? Math.floor(timestamp / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000 :
            selectedItem ==="월봉" ? timestamp : Math.floor(timestamp / (60 * 1000)) * (60 * 1000),
        turnover: (opening_price + low_price + high_price + trade_price) / 4 * candle_acc_trade_volume
      };
    });
    return arr.reverse();
    }
    else{
      const res = await axios.get(`https://api.binance.com/api/v3/klines${selectedLocation === "국내" ?items[selectedItem] : ''}`
      , {
        params: {
          symbol: market + "USDT",
          interval: interval[selectedItem],
          limit:200 //최대 개수 수정? 일단 upbit가 200개까지라 얘도 200 but 1000까지 가능
        }
      });
      const data = res.data;
      arr = data.map((item) => {
        return {open: item[1],
        low: item[3],
        high: item[2],
        close: item[4],
        volume: item[5],
        timestamp: selectedItem === "일봉" ? Math.floor(item[0] / 24 / 60 / 60 / 1000) * 24 * 60 * 60 * 1000 :
            selectedItem ==="월봉" ? item[0] : Math.floor(item[0] / (60 * 1000)) * (60 * 1000),
        turnover: (item[1] + item[3] + item[2] + item[4]) / 4 * item[5]}
      })
      return arr;

    }
   
    
   } catch (err) {
     console.error(err);
   }
}

export default getInitialDataList;

