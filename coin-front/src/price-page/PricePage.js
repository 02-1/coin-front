import DefaultPage from "../common/default-page/DefaultPage";
import CoinChart from "./chart/CoinChart";
import { useLocation } from "react-router-dom";
import "./app.scss";

function PricePage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const img_link = queryParams.get("img_link");
  const ticker = queryParams.get("ticker");
  const name = queryParams.get("name");

  const rowData = { img_link, ticker, name: decodeURIComponent(name) };

  return (
    <div>
      <DefaultPage rowData={rowData} />
      <div className="app">
        <CoinChart name={rowData.name} ticker={rowData.ticker} />
      </div>
    </div>
  );
}

export default PricePage;
