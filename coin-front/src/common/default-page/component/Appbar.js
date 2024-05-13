import "../css/Appbar.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Appbar({img_link, name, ticker}) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <>
      <div className="container">
        <IoIosArrowBack
          className="home_icon"
          onClick={() => handleClick("/")}
        />
        <div className="appbar">
          <img
            src={img_link}
            alt={ticker}
            className="coin-icon"
          />
          <div className="text">{name}({ticker})</div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default Appbar;
