import React, { useEffect, useState } from 'react';
import { fetchMarketData } from '../utils/api';
import Portfolio from './Portfolio';
import Trade from './Trade';
import MarketData from './MarketData';
import Orders from './Orders';
import Reports from './Reports';
import Notifications from './Notifications';
import '../styles/dashboard.css';
import "../styles/login.css";

const dashboardSections = [
  {
    title: "Welcome to CredoX Trading",
    subtitle: "Trade, invest, and grow your wealth with confidence. Explore your dashboard, manage your portfolio, and start trading!",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    alt: "Trading Hero",
    extra: null,
  },
  // {
  //   title: "Live Market Ticker",
  //   subtitle: "Stay updated with real-time price movements and volatility.",
  //   img: "https://images.pexels.com/photos/28682357/pexels-photo-28682357/free-photo-of-smartphone-displaying-stock-market-application-data.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   alt: "Market Ticker",
  //   extra: (
  //     <div className="dashboard-ticker-bar" style={{ marginTop: 12, overflowX: 'auto', whiteSpace: 'nowrap' }}>
  //       <span className="dashboard-ticker-symbol">AAPL</span>
  //       <span className="dashboard-ticker-price up">+2.15%</span>
  //       <span className="dashboard-ticker-symbol">TSLA</span>
  //       <span className="dashboard-ticker-price down">-1.08%</span>
  //       <span className="dashboard-ticker-symbol">BTC</span>
  //       <span className="dashboard-ticker-price up">+4.22%</span>
  //       <span className="dashboard-ticker-symbol">ETH</span>
  //       <span className="dashboard-ticker-price up">+1.67%</span>
  //       <span className="dashboard-ticker-symbol">AMZN</span>
  //       <span className="dashboard-ticker-price down">-0.44%</span>
  //       <span className="dashboard-ticker-symbol">GOOGL</span>
  //       <span className="dashboard-ticker-price up">+0.98%</span>
  //     </div>
  //   ),
  // },
  {
    title: "AI Portfolio Insights",
    subtitle: "Get real-time AI-driven suggestions to optimize your portfolio and manage risk.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    alt: "AI Portfolio",
    extra: null,
  },
  {
    title: "Community Trading Rooms",
    subtitle: "Join live rooms, collaborate with top traders, and copy winning strategies.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    alt: "Community",
    extra: null,
  },
  {
    title: "Biometric Security",
    subtitle: "Face and fingerprint login for ultimate account protection.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    alt: "Security",
    extra: null,
  },
  {
    title: "Real-Time Analytics",
    subtitle: "Animated charts and AI-powered sentiment analysis at your fingertips.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    alt: "Analytics",
    extra: null,
  },
  {
    title: "Trade Anywhere",
    subtitle: "Seamless experience on web, mobile, and smartwatch devices. Download our app for iOS, Android, and even your smartwatch for trading on the go.",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    alt: "Trade Anywhere",
    extra: (
      <div style={{ marginTop: 10 }}>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="dashboard-app-btn"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            style={{ height: 36, marginRight: 8, verticalAlign: "middle" }}
          />
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="dashboard-app-btn"
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            style={{ height: 36, verticalAlign: "middle" }}
          />
        </a>
      </div>
    ),
  },
  {
    title: "Gamified Learning & Trading Simulation",
    subtitle: "Earn badges, compete in virtual trading, and master new strategies with interactive lessons.",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    alt: "Gamified Learning",
    extra: null,
  },
];

const Dashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [showQuickTrade, setShowQuickTrade] = useState(false);
  const [tradeSymbol, setTradeSymbol] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');

  useEffect(() => {
    fetchMarketData().then(data => setMarketData(data));
  }, []);

  const handleQuickTradeSubmit = (e) => {
    e.preventDefault();
    let tradeDetails = `${tradeAmount} shares of ${tradeSymbol.toUpperCase()} (${orderType} order)`;
    if (orderType === 'limit') {
      tradeDetails += ` at $${limitPrice}`;
    }
    alert(`Quick trade executed: ${tradeDetails}`);
    setTradeSymbol('');
    setTradeAmount('');
    setOrderType('market');
    setLimitPrice('');
    setShowQuickTrade(false);
  };

  return (
    <div className="dashboard-bg" style={{ minHeight: "100vh", flexDirection: "column", alignItems: "stretch", background: "linear-gradient(135deg, #4b6cb7, #182848)" }}>
      {dashboardSections.map((section, idx) => (
        <section
          className={`dashboard-section animate-fadein`}
          style={{
            maxWidth: 900,
            margin: "40px auto 32px auto",
            display: "flex",
            alignItems: "center",
            gap: 32,
            flexWrap: "wrap",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          }}
          key={idx}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 className="dashboard-section-title" style={{ fontSize: "1.7rem", marginBottom: 8 }}>{section.title}</h2>
            <p className="login-subtitle" style={{ fontSize: "1.08rem", marginBottom: 18 }}>{section.subtitle}</p>
            {section.extra}
          </div>
          <img
            src={section.img}
            alt={section.alt}
            className="dashboard-hero-img"
            style={{ minWidth: 180, maxWidth: 260, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
          />
        </section>
      ))}

      {/* Quick Trade Widget */}
      <section
        className="dashboard-section animate-fadein"
        style={{
          maxWidth: 900,
          margin: "40px auto 32px auto",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <h2 className="dashboard-section-title">Quick Trade</h2>
        {!showQuickTrade ? (
          <button
            className="btn-primary"
            onClick={() => setShowQuickTrade(true)}
            style={{ padding: "10px 20px", fontSize: "1.1rem", cursor: "pointer", borderRadius: 6, background: "linear-gradient(90deg, #ffb347 0%, #182848 100%)", color: "#f0f0f0", border: "none" }}
            onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #182848 0%, #ffb347 100%)"}
            onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #ffb347 0%, #182848 100%)"}
          >
            Open Quick Trade
          </button>
        ) : (
          <form onSubmit={handleQuickTradeSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Symbol (e.g. AAPL)"
              value={tradeSymbol}
              onChange={e => setTradeSymbol(e.target.value)}
              required
              style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid #ffb347", fontSize: "1rem" }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={tradeAmount}
              onChange={e => setTradeAmount(e.target.value)}
              min="1"
              required
              style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid #ffb347", fontSize: "1rem" }}
            />
            <select
              value={orderType}
              onChange={e => setOrderType(e.target.value)}
              style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid #ffb347", fontSize: "1rem" }}
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
            </select>
            {orderType === 'limit' && (
              <input
                type="number"
                placeholder="Limit Price"
                value={limitPrice}
                onChange={e => setLimitPrice(e.target.value)}
                min="0"
                step="0.01"
                required
                style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid #ffb347", fontSize: "1rem" }}
              />
            )}
            <button
              type="submit"
              style={{ padding: "10px 20px", borderRadius: 6, background: "linear-gradient(90deg, #ffb347 0%, #182848 100%)", color: "#f0f0f0", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
              onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #182848 0%, #ffb347 100%)"}
              onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #ffb347 0%, #182848 100%)"}
            >
              Execute
            </button>
            <button
              type="button"
              onClick={() => setShowQuickTrade(false)}
              style={{ padding: "10px 20px", borderRadius: 6, background: "#444", color: "#f0f0f0", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
            >
              Cancel
            </button>
          </form>
        )}
      </section>

      {/* Integrated Components Section */}
      {/* <section
        className="dashboard-section animate-fadein"
        style={{
          maxWidth: 900,
          margin: "40px auto 32px auto",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}
      >
        <div>
          <h2 className="dashboard-section-title">Portfolio Overview</h2>
          <Portfolio showPerformanceChart={true} />
        </div>
        <div>
          <h2 className="dashboard-section-title">Market Data</h2>
          <MarketData data={marketData} />
        </div>
        <div>
          <h2 className="dashboard-section-title">Open Orders</h2>
          <Orders />
        </div>
        <div>
          <h2 className="dashboard-section-title">Recent Reports</h2>
          <Reports />
        </div>
        <div>
          <h2 className="dashboard-section-title">Trade</h2>
          <Trade />
        </div>
        <div>
          <h2 className="dashboard-section-title">Notifications</h2>
          <Notifications showPreview={true} />
        </div>
      </section> */}

      {/* Footer */}
      <footer className="dashboard-footer" style={{ marginTop: 40, padding: 20, background: "rgba(0,0,0,0.6)", color: "#f0f0f0", textAlign: "center", borderRadius: 12 }}>
        <div className="dashboard-footer-content" style={{ display: "flex", justifyContent: "space-between", maxWidth: 900, margin: "0 auto", flexWrap: "wrap", gap: 12 }}>
          <span>© {new Date().getFullYear()} CredoX Trading Platform</span>
          <span>
            <a href="/features" className="dashboard-footer-link" style={{ color: "#ffb347", marginRight: 12 }}>Advanced Features</a> | 
            <a href="/account" className="dashboard-footer-link" style={{ color: "#ffb347", marginRight: 12 }}>Account</a> | 
            <a href="/portfolio" className="dashboard-footer-link" style={{ color: "#ffb347" }}>Portfolio</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
