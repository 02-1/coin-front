import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import axios from "axios";

function TableList({ list, autoMode, options }) {
  const calculateAverageGapPercent = () => {
    if (list.length === 0) return 0;
    const totalGapPercent = list.reduce(
      (sum, item) => sum + item.gap_percent,
      0
    );
    return totalGapPercent / list.length;
  };
  const averageGapPercent = calculateAverageGapPercent();

  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    if (autoMode) {
      setValues([0, averageGapPercent]);
    } else {
      setValues(options);
    }
  }, [autoMode, averageGapPercent, options]);

  useEffect(() => {
    if (autoMode) {
      console.log('Updated values in autoMode:', [0, averageGapPercent]);
    }
  }, [values, autoMode, averageGapPercent]);

  const handleRowClick = (rowData) => {
    const url = "/prices";
    axios.get(
      `http://${process.env.REACT_APP_IP}/coin-viewed?symbol=${rowData.ticker}`
    );
    const params = new URLSearchParams(rowData).toString();
    window.open(`${url}?${params}`, `_blank`);
  };

  return (
    <div>
      {list.map((item, index) => (
        <TableRow
          key={item.id}
          {...item}
          id={index + 1}
          onClick={handleRowClick}
          values={values}
        />
      ))}
    </div>
  );
}

export default TableList;
