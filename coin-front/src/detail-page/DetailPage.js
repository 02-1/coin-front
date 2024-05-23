import DefaultPage from "../common/default-page/DefaultPage";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/DetailPage.css";
function DetailPage() {
  const location = useLocation();
  const { rowData } = location.state;
  const [detail, setDetail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://${process.env.REACT_APP_IP}/coin-detail?symbol=${rowData.ticker}`
      );
      setDetail(() => res.data.detail);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DefaultPage rowData={rowData} />
      <div className="detail-container">
        {loading ? <div>Loading...</div> : <div>{detail}</div>}
      </div>
    </>
  );
}

export default DetailPage;
