import React, { useEffect } from 'react';

const TradingViewWidget = ({ symbol }) => {  // Accept symbol as a prop
  useEffect(() => {
    // Load the TradingView script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => initTradingView();
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []); // Added symbol to dependency array if dynamic change is needed

  const initTradingView = () => {
    new window.TradingView.widget({
      "width": "100%",
      "height": 450,
      "symbol": symbol, // Use the symbol prop here
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "container_id": "tradingview_92622"
    });
  };

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_92622"></div>
      <div className="tradingview-widget-container__footer">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
