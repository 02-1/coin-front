import DefaultPage from "../common/default-page/DefaultPage";
import CoinChart from "./chart/CoinChart";
import { useLocation } from 'react-router-dom';
import './app.scss';

function PricePage() {
  const location = useLocation();
  const { rowData } = location.state;

  return (
    <div>
      <DefaultPage rowData={rowData}/>
      <div className="app">
        <CoinChart name={rowData.name} ticker={rowData.ticker}/>
      </div>
    </div>
  );
}
export default PricePage;
