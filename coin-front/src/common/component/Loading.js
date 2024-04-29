import React from "react";
import { FaSpinner } from 'react-icons/fa';
import "../css/Loading.css"

const Loading = () => {
  return (
    <div className="spinner-container">
      <FaSpinner className="spinner" /> {/* 로딩 중일 때 스피너 표시 */}
    </div>
  );
}

export default Loading;
