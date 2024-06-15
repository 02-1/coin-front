import React, { useState, useEffect, useRef } from "react";
import { init, dispose } from "klinecharts";
import "./chart.css";
import Layout from "../Layout";
import getInitialDataList from "../utils/getInitialDataList";
import getColors from "../utils/getColors";

const CoinChart = ({ name, ticker }) => {
  const [selectedItem, setSelectedItem] = useState("day");
  const [selectedLocation, setSelectedLocation] = useState("국내");
  
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  const handleChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (!chartRef1.current || !chartRef2.current) return;

    const chart1 = init(chartRef1.current);
    const chart2 = init(chartRef2.current);

    chart1.setStyles(getColors());
    chart2.setStyles(getColors());

    const fetchData = async () => {
      const dataList1 = await getInitialDataList({
        selectedItem,
        selectedLocation: "국내",
        ticker,
      });
      chart1.applyNewData(dataList1);

      const dataList2 = await getInitialDataList({
        selectedItem,
        selectedLocation: "해외",
        ticker,
      });
      chart2.applyNewData(dataList2);
    };
    fetchData();
    console.log("차트 초기화 및 데이터 적용 완료");

    return () => {
      if (chart1) {
        dispose(chart1);
      }
      if (chart2) {
        dispose(chart2);
      }
    };
  }, [selectedItem, selectedLocation, ticker]);

  return (
    <div>
      <div className="select-container">
        <select value={selectedItem} onChange={handleChange}>
          {["minute", "hour", "day"].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-list">
        <Layout title={`국내 Chart`}>
          <div ref={chartRef1} className="coin-chart" />
        </Layout>
        <Layout title={`해외 Chart`}>
          <div ref={chartRef2} className="coin-chart" />
        </Layout>
      </div>
    </div>
  );
};

export default CoinChart;
