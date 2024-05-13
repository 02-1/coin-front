import Appbar from "./component/Appbar";
import Top from "./component/Top";

function DefaultPage({rowData}) {
  return (
    <div>
      <Appbar rowData={rowData}/>
      <Top rowData={rowData}/>
    </div>
  );
}

export default DefaultPage;
