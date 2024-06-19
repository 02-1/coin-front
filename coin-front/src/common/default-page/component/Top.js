import { useState } from "react";
import "../css/Top.css";
import { toFormattedString } from "../../../Format";

function Top({ rowData }) {
  const [price, setPrice] = useState(0);

  getPrice();

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

  return (
    <div className="top">
      <div className="current-price">{toFormattedString(price)}원</div>
    </div>
  );
}

export default Top;
