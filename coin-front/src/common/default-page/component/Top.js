import CustomButton from "../../component/CustomButton";
import "../css/Top.css";
import { useNavigate } from "react-router-dom";

function Top({ ticker }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  async function getPrice() {
    try {
        const options = {
            method: "GET",
            headers: { accept: "application/json" },
        };
        const response = await fetch(
            `https://api.bithumb.com/public/ticker/${ticker}_KRW`,
            options
        );
        const data = await response.json();

        if (data && data.data.closing_price !== undefined) {
          return data.data.closing_price;
        } else {
            console.error("Closing price not found in response data.");
            return 0;
        }
    } catch (err) {
        console.error(err);
        return 0;
    }
}


  return (
    <div className="top">
      <div className="current-price">{getPrice()}</div>
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
