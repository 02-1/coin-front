import React, { useEffect, useState } from 'react';

const TestPage = () => {
  const [tradingViewTheme, setTradingViewTheme] = useState("Light");
  const [locale, setLocale] = useState("ko");
  const [viewLocale, setViewLocale] = useState("kr");
  const [tvKimchi, setTvKimchi] = useState(null);
  const [tvCoinbasePremium, setTvCoinbasePremium] = useState(null);

  useEffect(() => {
    const initializeWidgets = () => {
      if (getCookie("changeMode") === ".밤") {
        setTradingViewTheme("Dark");
      }
      if (locale === "ko") {
        setViewLocale("kr");
      }

      const TradingView = window.TradingView;

      const kimchiWidget = new TradingView.widget({
        "autosize": true,
        "width": 1080,
        "symbol": "((BINANCE:BTCUSD/BINANCE:BTCUSD)*BITHUMB:BTCKRW-BINANCE:BTCUSDT*FX_IDC:USDKRW)/(BINANCE:BTCUSD*FX_IDC:USDKRW)*100",
        "interval": "1D",
        "timezone": "Asia/Seoul",
        "theme": tradingViewTheme,
        "style": "1",
        "locale": viewLocale,
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "hide_top_toolbar": false,
        "container_id": "kimchipremium"
      });
      setTvKimchi(kimchiWidget);

      const coinbaseWidget = new TradingView.widget({
        "autosize": true,
        "width": 1080,
        "symbol": "((COINBASE:BTCUSD-BINANCE:BTCUSDT)/BINANCE:BTCUSDT)*100",
        "interval": "1D",
        "timezone": "Asia/Seoul",
        "theme": tradingViewTheme,
        "style": "1",
        "locale": viewLocale,
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "hide_top_toolbar": false,
        "container_id": "coinbasepremium"
      });
      setTvCoinbasePremium(coinbaseWidget);
    };

    loadScript('https://s3.tradingview.com/tv.js').then(() => {
      initializeWidgets();
    }).catch((error) => {
      console.error("Failed to load TradingView script:", error);
    });
  }, [tradingViewTheme, locale, viewLocale]);

  return (
    <div className="container">
      <div id="kimchipremium" style={{ width: '1000px', height: '610px' }}></div> 
    </div>
  );
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export default TestPage;
