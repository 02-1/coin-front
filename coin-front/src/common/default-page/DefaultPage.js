import Appbar from "./component/Appbar";
import Top from "./component/Top";

function DefaultPage({rowData}) {
  return (
    <div>
      <Appbar {...rowData}/>
      <Top />
    </div>
  );
}

export default DefaultPage;
