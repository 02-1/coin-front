import "../css/Appbar.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CustomTab from "../../component/CustomTab";
import { useState, useEffect } from "react";
import { toFormattedString } from "../../../Format";

function Appbar({ rowData }) {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path, { state: { rowData } });
  };
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function getPrice() {
      try {
        const options = {
          order_currency: `${rowData.ticker}_KRW`,
          method: "GET",
          headers: { accept: "application/json" },
        };
        const response = await fetch(
          `https://api.bithumb.com/public/ticker/${rowData.ticker}_KRW`,
          options
        );
        const data = await response.json();
        if (data && data.data.closing_price !== undefined) {
          setPrice(parseFloat(data.data.closing_price));
        } else {
          console.error("Closing price not found in response data.");
        }
      } catch (err) {
        console.error(err);
      }
    }

    getPrice();
  }, [rowData.ticker]);

  return (
    <>
      <div className="container">
        <IoIosArrowBack
          className="home_icon"
          onClick={() => handleClick("/")}
        />
        <div className="appbar">
          <img
            src={rowData.img_link}
            alt={rowData.ticker}
            className="coin-icon"
          />
          <div className="text">
            {rowData.name}({rowData.ticker})
          </div>
          <div className="current-price">{toFormattedString(price)}원</div>
          <div className="button">
            <CustomTab text="시세" onClick={() => handleClick("/prices")} />
            <CustomTab text="뉴스" onClick={() => handleClick("/news")} />
            <CustomTab text="정보" onClick={() => handleClick("/details")} />
            <CustomTab text="이때.." onClick={() => handleClick("/prices")} />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Appbar;
