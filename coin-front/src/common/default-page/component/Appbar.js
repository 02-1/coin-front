import "../css/Appbar.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CustomTab from "../../component/CustomTab";
import { useState, useEffect } from "react";
import { toFormattedString } from "../../../Format";
import { prominent } from "color.js";
import { Helmet } from "react-helmet";

function Appbar({ rowData }) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [rgbColor, setRgbColor] = useState("");

  useEffect(() => {
    async function fetchColor() {
      try {
        const color = await prominent(rowData.img_link, {
          amount: 1,
        });
        setRgbColor(() => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
      } catch (err) {
        console.error("Error fetching color: ", err);
      }
    }

    fetchColor();
  }, [rowData.img_link]);

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

  const handleTabClick = (path) => {
    navigate({
      pathname: path,
      search: `?img_link=${rowData.img_link}&ticker=${
        rowData.ticker
      }&name=${encodeURIComponent(rowData.name)}`,
    });
  };

  return (
    <>
      <Helmet>
        <title>{rowData.name}</title>
        <link rel="icon" type="image/png" href={rowData.img_link} />
      </Helmet>
      <div className="container">
        <IoIosArrowBack className="home_icon" onClick={() => navigate("/")} />
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
            <CustomTab
              text="시세"
              onClick={() => handleTabClick("/prices")}
              rgbColor={rgbColor}
            />
            <CustomTab
              text="뉴스"
              onClick={() => handleTabClick("/news")}
              rgbColor={rgbColor}
            />
            <CustomTab
              text="정보"
              onClick={() => handleTabClick("/details")}
              rgbColor={rgbColor}
            />
            <CustomTab
              text="이때.."
              onClick={() => handleTabClick("/past-price")}
              rgbColor={rgbColor}
            />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Appbar;
