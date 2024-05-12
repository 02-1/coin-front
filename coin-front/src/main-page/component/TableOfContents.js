import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "../css/TableOfContents.css";

const TableOfContents = ({ order, setOrder }) => {
  const handleCellClick = (orderBy) => {
    const newOrder = {
      upbit: null,
      binance: null,
      gap: null,
      percent: null,
    };

    if (order[orderBy] === null) {
      newOrder[orderBy] = "asc";
    } else if (order[orderBy] === "asc") {
      newOrder[orderBy] = "dsc";
    } else {
      newOrder[orderBy] = null;
    }

    setOrder(newOrder);
  };

  const renderArrow = (orderBy) => {
    if (
      order[orderBy] &&
      (order[orderBy] === "asc" || order[orderBy] === "dsc")
    ) {
      return (
        <span className="arrow">
          {order[orderBy] === "asc" ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </span>
      );
    }
    return <FontAwesomeIcon className="arrow-none" icon={faCaretUp} />;
  };

  return (
    <div className="table-of-contents">
      <div className="header">
        <div className={`cell`}>#</div>
        <div className={`cell`}>코인명</div>
        <div className={`cell`} onClick={() => handleCellClick("upbit")}>
          국내 가격 {renderArrow("upbit")}
        </div>
        <div className={`cell`} onClick={() => handleCellClick("binance")}>
          해외 가격 {renderArrow("binance")}
        </div>
        <div className={`cell`} onClick={() => handleCellClick("gap")}>
          시세차이(KRW) {renderArrow("gap")}
        </div>
        <div className={`cell`} onClick={() => handleCellClick("percent")}>
          시세차율(%) {renderArrow("percent")}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
