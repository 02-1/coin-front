function RefreshButton({ autoRefreshEnabled, setAutoRefreshEnabled }) {
  const handleAutoRefreshToggle = () => {
    setAutoRefreshEnabled(!autoRefreshEnabled);
  };
  return (
    <>
      <label>
        <span>자동 새로고침</span>
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
