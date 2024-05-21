function RefreshButton({
  refreshTime,
  setRefreshTime,
  autoRefreshEnabled,
  setAutoRefreshEnabled,
}) {
  const handleAutoRefreshToggle = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
    setRefreshTime(10);
  };

  const onchange = (e) => {
    setRefreshTime(e.target.value);
  };
  return (
    <>
      <label>
        <span>
          자동 새로고침
          {autoRefreshEnabled && (
            <>
              <input
                className={`refreshTime`}
                onChange={onchange}
                value={refreshTime}
              ></input>
              s
            </>
          )}
        </span>
        <input
          role="switch"
          type="checkbox"
          checked={autoRefreshEnabled}
          onChange={handleAutoRefreshToggle}
        />
      </label>
    </>
  );
}

export default RefreshButton;
