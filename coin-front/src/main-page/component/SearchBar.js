import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../css/SearchBar.css';
//import { getCoinList } from "../CoinList.js"
import MainPageSocket from "../MainPageSocket"

function SearchBar({setList}){
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {

    const handleReceivedMessage = (data) => {
      if (searchTerm.trim() === '') {
        setList(JSON.parse(data));
      };

      const filteredList = JSON.parse(data).filter(item => {
            const tickerMatch = item.ticker.toLowerCase().includes(searchTerm.toLowerCase());
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return tickerMatch || nameMatch;
          });
          setList(filteredList);
    };

    MainPageSocket(handleReceivedMessage);
  
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
};

export default SearchBar;
