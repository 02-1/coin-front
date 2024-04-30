import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchBar.css";
import {getCoinList} from "../MainPageFetch";

function SearchBar({ setList, setLoading}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    const list = await getCoinList();

    if (searchTerm.trim() === "") {
          setList(list);
          setLoading(false);
    }

    const filteredList = list.filter((item) => {
      const tickerMatch = item.ticker
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return tickerMatch || nameMatch;
    });
    setList(filteredList);
    setLoading(false);
  };

  return (
    <div className="search-bar">
      <div className="input-container">
        <input
          type="text"
          placeholder="코인명/심볼검색"
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
