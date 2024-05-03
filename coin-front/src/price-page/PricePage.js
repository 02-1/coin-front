import DefaultPage from "../common/default-page/DefaultPage";
import CoinChart from "./chart/CoinChart";
import './app.scss';

function PricePage() {
  return (
    <div>
      <DefaultPage />
      <div className="app">
        <CoinChart />
      </div>
    </div>
  );
}
export default PricePage;
