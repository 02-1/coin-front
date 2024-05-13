import DefaultPage from "../common/default-page/DefaultPage";
import { useLocation } from "react-router-dom";

function DetailPage() {
  const location = useLocation();
  const { rowData } = location.state;
  return (
    <>
      <DefaultPage rowData={rowData}/>
      details
    </>
  );
}
export default DetailPage;
