import React, { useState } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";
import CoinListProvider from "./CoinListProvider";

function MainPage() {
  const [list, setList] = useState([
    {
      id: 1,
      img_link: "https://static.upbit.com/logos/BTC.png",
      ticker: "BTC",
      name: "비트코인",
      price_binance: "00",
      price_upbit: "91,004,000",
      price_gap: "00",
      gap_percent: 0.0,
    },
    {
      id: 2,
      img_link: "https://static.upbit.com/logos/ETH.png",
      ticker: "ETH",
      name: "이더리움",
      price_binance: "00",
      price_upbit: "4,628,000",
      price_gap: "00",
      gap_percent: 0.0,
    },
    {
      id: 3,
      img_link: "https://static.upbit.com/logos/DOGE.png",
      ticker: "DOGE",
      name: "도지코인",
      price_binance: "00",
      price_upbit: "213.2",
      price_gap: "00",
      gap_percent: 0.0,
    },
    {
      id: 4,
      img_link: "https://static.upbit.com/logos/SHIB.png",
      ticker: "SHIB",
      name: "시바이누",
      price_binance: "00",
      price_upbit: "0.03583",
      price_gap: "00",
      gap_percent: -0.1,
    },
  ]);

  return (
    <>
      <SearchBar list={list} setList={setList}></SearchBar>
      <TableOfContents></TableOfContents>
      <TableList list={list}></TableList>
      <CoinListProvider setList={setList} />
    </>
  );
}

export default MainPage;
