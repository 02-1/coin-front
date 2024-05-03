import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";
import "./css/MainPage.css";
import Loading from "../common/component/Loading";
import { getCoinList } from "./MainPageFetch";

function MainPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);

  const getList = async () => {
    try{
      const newList = await getCoinList();
      setList(newList);
      setLoading(false);
    }catch{
      console.log("서버 연결 안되는뎁..");
      setLoading(false);
    }
    
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    let intervalId;

    if (autoRefreshEnabled) {
      intervalId = setInterval(() => {
        setLoading(true);
        getList();
        console.log("새로고침")
      }, 10000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [autoRefreshEnabled]);

  const handleAutoRefreshToggle = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
  };

  return (
    <>
      <label>
        <span>자동 새로고침</span>
        <input
          role="switch"
          type="checkbox"
          checked={autoRefreshEnabled}
          onChange={handleAutoRefreshToggle}
        />
      </label>
      <SearchBar setList={setList} setLoading={setLoading} />
      <TableOfContents />
      {loading && <Loading />}
      {!loading && <TableList list={list} />}
    </>
  );
}

export default MainPage;