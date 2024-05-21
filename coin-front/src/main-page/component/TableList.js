import React from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";

function TableList({ list }) {
  const navigate = useNavigate();

  const calculateAverageGapPercent = () => {
    if (list.length === 0) return 0;
    const totalGapPercent = list.reduce(
      (sum, item) => sum + item.gap_percent,
      0
    );
    return totalGapPercent / list.length;
  };

  const averageGapPercent = calculateAverageGapPercent();

  const handleRowClick = (rowData) => {
    navigate("/prices", { state: { rowData } });
  };

  return (
    <div>
      {list.map((item, index) => (
        <TableRow
          key={item.id}
          {...item}
          id={index + 1}
          onClick={handleRowClick}
          averageGapPercent={averageGapPercent}
        />
      ))}
    </div>
  );
}

export default TableList;
