import "../css/Appbar.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Appbar() {
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
            src={"https://static.upbit.com/logos/BTC.png"}
            className="coin-icon"
          />
          <div className="text">비트코인(BTC)</div>
        </div>
      </div>
      <hr />
    </>
  );
}
export default Appbar;
