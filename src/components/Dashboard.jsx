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
    img: "https://static.vecteezy.com/system/resources/previews/006/741/614/non_2x/business-graph-charts-of-financial-concept-stock-market-exchange-trading-graph-analysis-investment-indicator-free-photo.jpg",
    alt: "Trading Hero",
    extra: null,
  },
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
    <div className="dashboard-bg" style={{ minHeight: "100vh", flexDirection: "column", alignItems: "stretch" }}>
      {dashboardSections.map((section, idx) => (
        <section
          className="dashboard-section animate-fadein"
          key={idx}
        >
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 className="dashboard-section-title">{section.title}</h2>
            <p className="login-subtitle">{section.subtitle}</p>
            {section.extra}
          </div>
          <img
            src={section.img}
            alt={section.alt}
            className="dashboard-hero-img"
          />
        </section>
      ))}

      {/* Quick Trade Widget */}
      <section
        className="dashboard-section animate-fadein"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <h2 className="dashboard-section-title">Quick Trade</h2>
        {!showQuickTrade ? (
          <button
            className="btn-primary"
            onClick={() => setShowQuickTrade(true)}
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
              style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid var(--gradient-accent)", fontSize: "1rem" }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={tradeAmount}
              onChange={e => setTradeAmount(e.target.value)}
              min="1"
              required
              style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid var(--gradient-accent)", fontSize: "1rem" }}
            />
            <select
              value={orderType}
              onChange={e => setOrderType(e.target.value)}
              style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid var(--gradient-accent)", fontSize: "1rem" }}
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
                style={{ flex: "1 1 150px", padding: 10, borderRadius: 6, border: "1.5px solid var(--gradient-accent)", fontSize: "1rem" }}
              />
            )}
            <button
              type="submit"
              style={{ padding: "10px 20px", borderRadius: 6, background: "linear-gradient(90deg, var(--gradient-accent) 0%, var(--gradient-end) 100%)", color: "var(--gradient-text)", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
            >
              Execute
            </button>
            <button
              type="button"
              onClick={() => setShowQuickTrade(false)}
              style={{ padding: "10px 20px", borderRadius: 6, background: "#444", color: "var(--gradient-text)", border: "none", cursor: "pointer", fontSize: "1.1rem" }}
            >
              Cancel
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer-content">
          <span>© {new Date().getFullYear()} CredoX Trading Platform</span>
          <span>
            <a href="/account" className="dashboard-footer-link">Account</a> | 
            <a href="/portfolio" className="dashboard-footer-link">Portfolio</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
