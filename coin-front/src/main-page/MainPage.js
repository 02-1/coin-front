import React, { useState , useEffect } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";
//import CoinListProvider from "./CoinListProvider";
//import { getCoinList } from "./CoinList.js"
import MainPageSocket from "./MainPageSocket"
import Loading from "../common/component/Loading";


function MainPage() {
  const [list, setList] = useState([
    //{"id":1,"img_link":"https://static.upbit.com/logos/BTC.png","ticker":"BTC","name":"비트코인","price_upbit":"91,098,000","price_binance":"87,389,257","price_gap":"3,708,743","gap_percent":-4.071157292146924},{"id":2,"img_link":"https://static.upbit.com/logos/ETH.png","ticker":"ETH","name":"이더리움","price_upbit":"4,686,000","price_binance":"4,496,657","price_gap":"189,343","gap_percent":4.040610542040115},{"id":3,"img_link":"https://static.upbit.com/logos/DOGE.png","ticker":"DOGE","name":"도지코인","price_upbit":"212.9","price_binance":"204.2","price_gap":"8.67010","gap_percent":4.072381399718173},{"id":4,"img_link":"https://static.upbit.com/logos/SHIB.png","ticker":"SHIB","name":"시바이누","price_upbit":"0.03564","price_binance":"0.03420","price_gap":"-0.00144","gap_percent":4.042648709315373}
    ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleReceivedMessage = (data) => {
      setList(JSON.parse(data));
      setLoading(false)
    };

    MainPageSocket(handleReceivedMessage);

  }, []);
  
  // getCoinList()
  // .then(data => {
  //   console.log('Received data:', data);
  //   setList(data);
  // })
  // .catch(error => {
  //   console.error('Error fetching data:', error);
  // });

  return (
    <>
      <SearchBar setList={setList}/>
      <TableOfContents/>
      {loading &&  
        <Loading/>}
      {!loading && 
        <TableList list={list}/>
      }
      {/* <CoinListProvider setList={setList} /> */}
    </>
  );
}

export default MainPage;
