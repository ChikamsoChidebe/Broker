import React, { useEffect, useState } from 'react';
import { fetchUserPortfolio } from '../utils/api';
import '../styles/portfolio.css';
import '../styles/dashboard.css';
import '../styles/login.css';

// Dummy data for the table and chart
const holdings = [
  { asset: "AAPL", type: "Stock", quantity: 25, price: 195.2, value: 4880 },
  { asset: "TSLA", type: "Stock", quantity: 10, price: 180.5, value: 1805 },
  { asset: "BTC", type: "Crypto", quantity: 0.15, price: 67000, value: 10050 },
  { asset: "ETH", type: "Crypto", quantity: 2, price: 3400, value: 6800 },
  { asset: "VOO", type: "ETF", quantity: 8, price: 420, value: 3360 },
];

const activity = [
  {
    type: "buy",
    asset: "AAPL",
    amount: 10,
    price: 195.2,
    time: "1d ago",
    img: "https://logo.clearbit.com/apple.com",
  },
  {
    type: "sell",
    asset: "BTC",
    amount: 0.05,
    price: 67000,
    time: "2d ago",
    img: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026",
  },
  {
    type: "buy",
    asset: "TSLA",
    amount: 5,
    price: 180.5,
    time: "3d ago",
    img: "https://logo.clearbit.com/tesla.com",
  },
  {
    type: "buy",
    asset: "VOO",
    amount: 3,
    price: 420,
    time: "5d ago",
    img: "https://logo.clearbit.com/vanguard.com",
  },
];

const portfolioSections = [
  {
    title: "Your Portfolio Overview",
    subtitle: "See your current holdings, asset allocation, and total portfolio value at a glance.",
    img: "https://images.pexels.com/photos/7567228/pexels-photo-7567228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Portfolio Overview",
    extra: (
      <div className="portfolio-value-card animate-pop">
        <span className="portfolio-value-label">Total Value</span>
        <span className="portfolio-value-amount">$24,580.75</span>
        <span className="portfolio-value-change up">+3.2% Today</span>
      </div>
    ),
  },
  {
    title: "Asset Allocation",
    subtitle: "Diversify your investments across stocks, crypto, and more. See your allocation in real time.",
    img: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&w=600&q=80",
    alt: "Asset Allocation",
    extra: (
      <div className="portfolio-allocation-bar animate-fadein">
        <div className="allocation-segment stocks" style={{ width: "55%" }} title="Stocks"></div>
        <div className="allocation-segment crypto" style={{ width: "25%" }} title="Crypto"></div>
        <div className="allocation-segment etf" style={{ width: "15%" }} title="ETF"></div>
        <div className="allocation-segment cash" style={{ width: "5%" }} title="Cash"></div>
      </div>
    ),
  },
  {
    title: "Recent Activity",
    subtitle: "Track your latest trades and portfolio changes with animated highlights.",
    img: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&w=600&q=80",
    alt: "Recent Activity",
    extra: null, // We'll render the activity list below
  },
];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        const data = await fetchUserPortfolio();
        setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPortfolioData();
  }, []);

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  if (error) {
    return <div>Error loading portfolio: {error}</div>;
  }

  const totalValue = portfolio.reduce((acc, asset) => acc + asset.value, 0);
  const assetAllocation = portfolio.map(asset => ({
    name: asset.name,
    percentage: ((asset.value / totalValue) * 100).toFixed(2),
  }));

  return (
    <div className="login-bg" style={{ minHeight: "100vh", flexDirection: "column", alignItems: "stretch" }}>
      {/* Section 1: Portfolio Overview */}
      <section
        className="dashboard-section animate-fadein"
        style={{
          maxWidth: 900,
          margin: "40px auto 32px auto",
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem", marginBottom: 8 }}>
            {portfolioSections[0].title}
          </h2>
          <p className="login-subtitle" style={{ fontSize: "1.05rem", marginBottom: 18 }}>
            {portfolioSections[0].subtitle}
          </p>
          <div className="portfolio-value-card animate-pop">
            <span className="portfolio-value-label">Total Value</span>
            <span className="portfolio-value-amount">$24,895.00</span>
            <span className="portfolio-value-change up">+3.2% Today</span>
          </div>
        </div>
        <img
          src={portfolioSections[0].img}
          alt={portfolioSections[0].alt}
          className="dashboard-hero-img"
          style={{ minWidth: 180, maxWidth: 260 }}
        />
      </section>

      {/* Section 2: Asset Allocation with Chart */}
      <section
        className="dashboard-section animate-fadein"
        style={{
          maxWidth: 900,
          margin: "40px auto 32px auto",
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem", marginBottom: 8 }}>
            {portfolioSections[1].title}
          </h2>
          <p className="login-subtitle" style={{ fontSize: "1.05rem", marginBottom: 18 }}>
            {portfolioSections[1].subtitle}
          </p>
          <div className="portfolio-allocation-bar animate-fadein">
            <div className="allocation-segment stocks" style={{ width: "40%" }} title="Stocks"></div>
            <div className="allocation-segment crypto" style={{ width: "40%" }} title="Crypto"></div>
            <div className="allocation-segment etf" style={{ width: "15%" }} title="ETF"></div>
            <div className="allocation-segment cash" style={{ width: "5%" }} title="Cash"></div>
          </div>
          {/* Simple donut chart using SVG */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="portfolio-donut-chart">
            <circle r="48" cx="60" cy="60" fill="transparent" stroke="#2b6cb0" strokeWidth="18" strokeDasharray="120 240" strokeDashoffset="0" />
            <circle r="48" cx="60" cy="60" fill="transparent" stroke="#f6ad55" strokeWidth="18" strokeDasharray="120 240" strokeDashoffset="-120" />
            <circle r="38" cx="60" cy="60" fill="#fff" />
            <text x="60" y="65" textAnchor="middle" fontSize="1.1rem" fill="#2b6cb0" fontWeight="bold">$24.9k</text>
          </svg>
          <div className="portfolio-donut-legend">
            <span><span className="legend-dot" style={{ background: "#2b6cb0" }}></span>Stocks/Crypto</span>
            <span><span className="legend-dot" style={{ background: "#f6ad55" }}></span>ETF/Cash</span>
          </div>
        </div>
        <img
          src={portfolioSections[1].img}
          alt={portfolioSections[1].alt}
          className="dashboard-hero-img"
          style={{ minWidth: 180, maxWidth: 260 }}
        />
      </section>

      {/* Section 3: Holdings Table & Recent Activity */}
      <section
        className="dashboard-section animate-fadein"
        style={{
          maxWidth: 900,
          margin: "40px auto 32px auto",
          display: "flex",
          alignItems: "flex-start",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 2, minWidth: 320 }}>
          <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem", marginBottom: 8 }}>
            Holdings
          </h2>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.asset}</td>
                  <td>{row.type}</td>
                  <td>{row.quantity}</td>
                  <td>${row.price.toLocaleString()}</td>
                  <td>${row.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 className="dashboard-section-title" style={{ fontSize: "1.2rem", marginBottom: 8 }}>
            Recent Activity
          </h2>
          <ul className="portfolio-activity-list animate-fadein">
            {activity.map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src={item.img}
                  alt={item.asset}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginRight: 6,
                    border: "1.5px solid #e2e8f0",
                    background: "#fff"
                  }}
                />
                <span className={`activity-dot ${item.type}`}></span>
                {item.type === "buy" ? "Bought" : "Sold"} <b>{item.amount}</b> {item.asset} @ ${item.price.toLocaleString()} <span className="activity-time">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <img
          src={portfolioSections[2].img}
          alt={portfolioSections[2].alt}
          className="dashboard-hero-img"
          style={{ minWidth: 180, maxWidth: 260 }}
        />
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="dashboard-footer-content">
          <span>© {new Date().getFullYear()} Codex Trading Platform</span>
          <span>
            <a href="/features" className="dashboard-footer-link">Advanced Features</a> | 
            <a href="/account" className="dashboard-footer-link">Account</a> | 
            <a href="/dashboard" className="dashboard-footer-link">Dashboard</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;