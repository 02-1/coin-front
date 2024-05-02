import CustomButton from "../../component/CustomButton";
import "../css/Top.css";
import { useNavigate } from "react-router-dom";

function Top() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="top">
      <div className="current-price">101,318,000원</div>
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
