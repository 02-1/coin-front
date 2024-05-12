import React from "react";
import "../css/TableRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const TableRow = ({
  id,
  img_link,
  ticker,
  name,
  price_binance,
  price_upbit,
  price_gap,
  gap_percent,
}) => {
  const icon = gap_percent >= 0 ? faCaretUp : faCaretDown;
  const gapClass = gap_percent >= 0 ? "positive-gap" : "negative-gap";
  const formattedGapPercent =
    gap_percent >= 0 ? gap_percent.toFixed(2) : -gap_percent.toFixed(2);

  return (
    <div className="coin-table-row">
      <div className="cells">
        <div className="cell">{id}</div>
        <div className="cell">
          <div className="icon-container">
            <img src={img_link} alt="coin-icon" className="coin-icon" />
          </div>
          <div className="ticker">{ticker}</div>
          <div className="name">{name}</div>
        </div>
        <div className={`cell ${gapClass}`}>{price_upbit}</div>
        <div className={`cell ${gapClass}`}>{price_binance}</div>
        <div className={`cell ${gapClass}`}>
          {price_gap} <FontAwesomeIcon icon={icon} />
        </div>
        <div className={`cell ${gapClass}`}>{formattedGapPercent}%</div>
      </div>
    </div>
  );
};

export default TableRow;
