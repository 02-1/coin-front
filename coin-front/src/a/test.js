import React, { useEffect, useState } from "react";
import Layout from "../price-page/Layout";
import { init, dispose } from "klinecharts";
import getInitialDataList from "../price-page/utils/getInitialDataList";
import getColors from "../price-page/utils/getColors";
import "../price-page/chart/chart.css";
import "./app-test.scss";

const TestPage = () => {
  const [tradingViewTheme, setTradingViewTheme] = useState("Light");
  const locale = "ko";
  const [viewLocale, setViewLocale] = useState("kr");
  const ticker = "BTC";
  const [selectedItem, setSelectedItem] = useState("day");
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
        ticker,
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
  }, [selectedItem, selectedLocation, ticker]);

  useEffect(() => {
    const initializeWidgets = () => {
      if (getCookie("changeMode") === ".밤") {
        setTradingViewTheme("Dark");
      }
      if (locale === "ko") {
        setViewLocale("kr");
      }

      const TradingView = window.TradingView;

      new TradingView.widget({
        autosize: true,
        width: 1080,
        symbol:
          "((BINANCE:BTCUSD/BINANCE:BTCUSD)*BITHUMB:BTCKRW-BINANCE:BTCUSDT*FX_IDC:USDKRW)/(BINANCE:BTCUSD*FX_IDC:USDKRW)*100",
        interval: "1D",
        timezone: "Asia/Seoul",
        theme: tradingViewTheme,
        style: "1",
        locale: viewLocale,
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_top_toolbar: false,
        container_id: "kimchipremium",
      });

      new TradingView.widget({
        autosize: true,
        width: 1080,
        symbol: "((COINBASE:BTCUSD-BINANCE:BTCUSDT)/BINANCE:BTCUSDT)*100",
        interval: "1D",
        timezone: "Asia/Seoul",
        theme: tradingViewTheme,
        style: "1",
        locale: viewLocale,
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_top_toolbar: false,
        container_id: "coinbasepremium",
      });
    };

    loadScript("https://s3.tradingview.com/tv.js")
      .then(() => {
        initializeWidgets();
      })
      .catch((error) => {
        console.error("Failed to load TradingView script:", error);
      });
  }, [tradingViewTheme, locale, viewLocale]);

  return (
    <div className="hing-container">
      <div
        id="kimchipremium"
        style={{ width: "640px", height: "500px", margin: "0 0 0 30px" }}
      ></div>

      <div className="app-test">
        <Layout>
          <div id="coin-chart" className="coin-chart" />
        </Layout>
        <div className="chart-info">
          과거의 해외 거래소와 국내 거래소 간의 시세차이(김치 프리미엄)에 대한
          정보는 접근성이 좋지 못한데, 이러한 과거의 김치프리미엄 데이터를 가장
          대표적인 코인 (비트코인)과 배치하여, 김치프리미엄의 변동성에 따라
          비트코인의 변동성은 어떠한 영향이 있었는지 보여줌으로써 투자자에게 좀
          더 안전한 투자를 보장해줌.
        </div>
      </div>
    </div>
  );
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default TestPage;
