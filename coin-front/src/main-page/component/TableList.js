import React from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";

function TableList({ list }) {
  const navigate = useNavigate();

  const handleRowClick = (rowData) => {
    navigate("/prices", { state: { rowData } });
  };

  return (
    <div>
      {list.map((item) => (
        <TableRow key={item.id} {...item} onClick={handleRowClick} />
      ))}
    </div>
  );
}

export default TableList;
