import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchMarketData } from '../utils/api';
import '../styles/marketdata.css';
import '../styles/dashboard.css';
import '../styles/login.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Example market data
const trending = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 195.2,
    change: "+2.15%",
    img: "https://logo.clearbit.com/apple.com",
    trend: "up",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 180.5,
    change: "-1.08%",
    img: "https://logo.clearbit.com/tesla.com",
    trend: "down",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 67000,
    change: "+4.22%",
    img: "bitcoin.png",
    trend: "up",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3400,
    change: "+1.67%",
    img: "ethereum.png",
    trend: "up",
  },
];

const heatmapSectors = [
  { sector: "Tech", value: 2.1, color: "#38a169" },
  { sector: "Energy", value: -1.3, color: "#e53e3e" },
  { sector: "Finance", value: 0.7, color: "#f6ad55" },
  { sector: "Healthcare", value: 1.8, color: "#4299e1" },
  { sector: "Retail", value: -0.5, color: "#ed8936" },
];

const news = [
  {
    title: "AI Stocks Surge as Tech Leads Market Rally",
    img: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&w=400&q=80",
    link: "#",
    time: "10m ago",
  },
  {
    title: "Crypto Market Hits New Highs",
    img: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&w=400&q=80",
    link: "#",
    time: "30m ago",
  },
  {
    title: "Oil Prices Drop Amid Global Uncertainty",
    img: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&w=400&q=80",
    link: "#",
    time: "1h ago",
  },
];

const MarketData = () => {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({});

    const prepareChartData = (data) => {
        const labels = data.map(item => item.symbol || item.timestamp || '');
        const prices = data.map(item => item.price);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Stock Prices',
                    data: prices,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    fill: true,
                },
            ],
        });
    };

    useEffect(() => {
        const loadMarketData = async () => {
            try {
                const data = await fetchMarketData();
                if (!data || data.length === 0) {
                    prepareChartData(trending);
                    setMarketData(trending);
                } else {
                    setMarketData(data);
                    prepareChartData(data);
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                prepareChartData(trending);
                setMarketData(trending);
                setLoading(false);
            }
        };
        loadMarketData();
    }, []);

    if (loading) {
        return <div>Loading market data...</div>;
    }

    if (error) {
        return <div>Error fetching market data: {error.message}</div>;
    }

    return (
        <div className="login-bg" style={{ minHeight: "100vh", flexDirection: "column", alignItems: "stretch" }}>
            {/* Section 1: Trending Assets */}
            <section
              className="dashboard-section animate-fadein"
              style={{
                maxWidth: 900,
                margin: "40px auto 32px auto",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem" }}>
                Trending Assets
              </h2>
              <div className="marketdata-trending-list">
                {trending.map((item, idx) => (
                  <div className={`marketdata-trending-card animate-pop`} key={idx}>
                    <img
                      src={item.img}
                      alt={item.symbol}
                      className="marketdata-trending-img"
                    />
                    <div>
                      <div className="marketdata-trending-symbol">{item.symbol}</div>
                      <div className="marketdata-trending-name">{item.name}</div>
                    </div>
                    <div className="marketdata-trending-price">
                      ${item.price.toLocaleString()}
                      <span className={`marketdata-trending-change ${item.trend}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Sector Heatmap */}
            <section
              className="dashboard-section animate-fadein"
              style={{
                maxWidth: 900,
                margin: "40px auto 32px auto",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem" }}>
                Sector Heatmap
              </h2>
              <div className="marketdata-heatmap">
                {heatmapSectors.map((sector, idx) => (
                  <div
                    key={idx}
                    className="marketdata-heatmap-sector"
                    style={{
                      background: sector.color,
                      animationDelay: `${idx * 0.15}s`,
                    }}
                  >
                    <span className="marketdata-heatmap-sector-name">{sector.sector}</span>
                    <span className="marketdata-heatmap-sector-value">
                      {sector.value > 0 ? "+" : ""}
                      {sector.value}%
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Market News */}
            <section
              className="dashboard-section animate-fadein"
              style={{
                maxWidth: 900,
                margin: "40px auto 32px auto",
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <h2 className="dashboard-section-title" style={{ fontSize: "1.5rem" }}>
                Market News
              </h2>
              <div className="marketdata-news-list">
                {news.map((item, idx) => (
                  <a href={item.link} className="marketdata-news-card animate-pop" key={idx}>
                    <img src={item.img} alt={item.title} className="marketdata-news-img" />
                    <div>
                      <div className="marketdata-news-title">{item.title}</div>
                      <div className="marketdata-news-time">{item.time}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Footer */}
            <footer className="classical-footer">
              <div className="classical-footer-content">
                <span>© {new Date().getFullYear()} Crodex</span>
                <span>
                  <a href="/features" className="classical-footer-link">Features</a> | 
                  <a href="/account" className="classical-footer-link">Account</a> | 
                  <a href="/dashboard" className="classical-footer-link">Dashboard</a> | 
                  <a href="/portfolio" className="classical-footer-link">Portfolio</a>
                </span>
              </div>
            </footer>
          </div>
    );
};

export default MarketData;