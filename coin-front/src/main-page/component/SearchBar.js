import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../css/SearchBar.css";

function SearchBar({ search, setSearch }) {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <div className="input-container">
        <input
          type="text"
          placeholder="코인명/심볼검색"
          className="search-input"
          value={search}
          onChange={handleInputChange}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
