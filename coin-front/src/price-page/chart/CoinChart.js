import React, { useState, useEffect } from "react";
import { init, dispose } from "klinecharts";
import "./chart.css";
import Layout from "../Layout";
import getInitialDataList from "../utils/getInitialDataList";
import getColors from "../utils/getColors";

const market = "BTC";

const CoinChart = () => {
  const [selectedItem, setSelectedItem] = useState("분봉");
  const [selectedLocation, setSelectedLocation] = useState("국내");

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    const chart = init("coin-chart");

    chart.setStyles(getColors());

    const fetchData = async () => {
      const dataList = await getInitialDataList({
        selectedItem,
        selectedLocation,
        market,
      });
      chart.applyNewData(dataList);
    };
    fetchData();
    console.log("차트 초기화 및 데이터 적용 완료");

    return () => {
      if (chart) {
        dispose(chart);
      }
    };
  }, [selectedItem, selectedLocation]);

  return (
    <div>
      <div className="select-container">
        <div>
          <button
            className={selectedLocation === "국내" ? "selected-location" : ""}
            onClick={() => handleLocationChange("국내")}
          >
            국내
          </button>
          <button
            className={selectedLocation === "해외" ? "selected-location" : ""}
            onClick={() => handleLocationChange("해외")}
          >
            해외
          </button>
        </div>
        <select value={selectedItem} onChange={handleChange}>
          {["분봉", "일봉", "월봉"].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <Layout title="Bitcoin Chart">
        <div id="coin-chart" className="coin-chart" />
      </Layout>
    </div>
  );
};

export default CoinChart;
