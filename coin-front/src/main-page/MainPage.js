import React, { useState, useEffect } from "react";
import SearchBar from "./component/SearchBar";
import TableList from "./component/TableList";
import TableOfContents from "./component/TableOfContents";

import Loading from "../common/component/Loading";
import { getCoinList } from "./MainPageFetch";

function MainPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    const newList = await getCoinList();

    console.log(newList);
    setList(newList);
    setLoading(false);
  };

  useEffect(() => {
    getList();

  }, []);

  return (
    <>
      <SearchBar setList={setList} setLoading={setLoading} />
      <TableOfContents />
      {loading && <Loading />}
      {!loading && <TableList list={list} />}
    </>
  );
}

export default MainPage;
