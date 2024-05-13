import { useState } from "react";
import CustomButton from "../../component/CustomButton";
import "../css/Top.css";
import { useNavigate } from "react-router-dom";
import { toFormattedString } from "../../../Format";

function Top({ rowData }) {
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { state: { rowData } });
  };

  getPrice();

  async function getPrice() {
    try {
      const options = {
        order_currency: `${rowData.ticker}_KRW`,
        method: "GET",
        headers: { accept: "application/json" },
      };
      const response = await fetch(
        `https://api.bithumb.com/public/ticker`,
        options
      );
      const data = await response.json();
      if (data && data.data.closing_price !== undefined) {
        setPrice(data.data.closing_price);
      } else {
        console.error("Closing price not found in response data.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="top">
      <div className="current-price">{toFormattedString(price)}</div>
      <div className="button">
        <CustomButton text="시세" onClick={() => handleClick("/prices")} />
        <CustomButton text="뉴스" onClick={() => handleClick("/news")} />
        <CustomButton text="정보" onClick={() => handleClick("/details")} />
        <CustomButton text="이때.." onClick={() => handleClick("/prices")} />
      </div>
    </div>
  );
}

export default Top;
