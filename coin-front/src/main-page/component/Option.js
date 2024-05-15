import { toFormattedString } from "../../Format";
import Clock from "./Clock";
import RefreshButton from "./RefreshButton";

function Option({
  autoRefreshEnabled,
  setAutoRefreshEnabled,
  exchange,
  refreshTime,
  setRefreshTime,
}) {
  return (
    <div className="option">
      <div className="clock">
        <Clock />
      </div>
      <div className="option-right">
        <RefreshButton
          refreshTime={refreshTime}
          setRefreshTime={setRefreshTime}
          autoRefreshEnabled={autoRefreshEnabled}
          setAutoRefreshEnabled={setAutoRefreshEnabled}
        />
        <p className="rating">
          <span>환율 : </span>
          {toFormattedString(exchange)}
        </p>
      </div>
    </div>
  );
}

export default Option;
