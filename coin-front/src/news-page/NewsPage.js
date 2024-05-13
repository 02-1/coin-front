import { useLocation } from "react-router-dom";
import DefaultPage from "../common/default-page/DefaultPage";


function NewsPage() { 
  const location = useLocation();
  const { rowData } = location.state;
  return (
    <div>
      <DefaultPage rowData={rowData}/>
      <div>news</div>
    </div>
  );
}
export default NewsPage;
