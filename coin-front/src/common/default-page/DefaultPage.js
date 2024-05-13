import Appbar from "./component/Appbar";
import Top from "./component/Top";

function DefaultPage({rowData}) {
  return (
    <div>
      <Appbar {...rowData}/>
      <Top ticker={rowData.tocker}/>
    </div>
  );
}

export default DefaultPage;
