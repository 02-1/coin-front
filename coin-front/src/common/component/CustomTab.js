import "../css/CustomTab.css";

const CustomTab = ({ text, onClick, rgbColor }) => {
  const tabContainerStyle = {
    "--after-bg-color": rgbColor,
  };

  return (
    <div className="tab_container" onClick={onClick} style={tabContainerStyle}>
      {text || "null"}
    </div>
  );
};

export default CustomTab;
