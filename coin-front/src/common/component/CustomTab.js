import "../css/CustomTab.css";

const CustomTab = ({ text, onClick, isClicked }) => {
  return (
    <div className={`tab_contianer`} onClick={onClick}>
      {text || "null"}
    </div>
  );
};

export default CustomTab;
