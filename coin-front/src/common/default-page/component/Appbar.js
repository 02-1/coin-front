import "../css/Appbar.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Appbar({rowData}) {
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
            src={rowData.img_link}
            alt={rowData.ticker}
            className="coin-icon"
          />
          <div className="text">{rowData.name}({rowData.ticker})</div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default Appbar;
