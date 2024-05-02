import React from "react";

import "../css/CustomButton.css";

const CustomButton = (props) => {
  const { text, onClick } = props;
  return (
    <div className="btn_container" onClick={onClick}>
      {text || "null"}
    </div>
  );
};
export default CustomButton;
