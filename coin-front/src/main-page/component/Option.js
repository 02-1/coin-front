import RefreshButton from "./RefreshButton";

function Option({ autoRefreshEnabled, setAutoRefreshEnabled , rating}) {
  return (
    <div className="option">
      <RefreshButton
        autoRefreshEnabled={autoRefreshEnabled}
        setAutoRefreshEnabled={setAutoRefreshEnabled}
      />
      <p className="rating"><span>환율 : </span>{rating}</p>
    </div>
  );
}

export default Option;
