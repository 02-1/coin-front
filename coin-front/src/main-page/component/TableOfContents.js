import React from 'react';
import '../css/TableOfContents.css'; 

const TableOfContents = () => {
  return (
    <div className="table-of-contents">
      <div className="header">
        <div className="cell">#</div>
        <div className="cell">코인명</div>
        <div className="cell">국내 가격</div>
        <div className="cell">해외 가격</div>
        <div className="cell">시세차이(KRW)</div>
        <div className="cell">시세차율(%)</div>
      </div>
    </div>
  );
};

export default TableOfContents;
