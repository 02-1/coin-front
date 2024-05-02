import React from "react";
import PropTypes from "prop-types";
import "../css/CustomButton.css";

const CustomButton = ({ text, onClick }) => {
  return (
    <div className="btn_container" onClick={onClick}>
      {text || "null"}
    </div>
  );
};

export default CustomButton;
