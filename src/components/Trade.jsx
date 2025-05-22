import React, { useState, useEffect } from 'react';
import { fetchMarketData, executeTrade } from '../utils/api';
import '../styles/trade.css';

const Trade = () => {
    const [marketData, setMarketData] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [tradeQuantity, setTradeQuantity] = useState(1);
    const [tradeType, setTradeType] = useState('buy');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const loadMarketData = async () => {
            try {
                const data = await fetchMarketData();
                setMarketData(data);
            } catch (err) {
                setError('Failed to fetch market data');
            }
        };

        loadMarketData();
    }, []);

    const handleStockSelect = (stock) => {
        setSelectedStock(stock);
        setError('');
        setSuccessMessage('');
    };

    const handleTradeQuantityChange = (e) => {
        setTradeQuantity(e.target.value);
    };

    const handleTradeTypeChange = (e) => {
        setTradeType(e.target.value);
    };

    const handleTradeExecution = async (e) => {
        e.preventDefault();
        if (!selectedStock) {
            setError('Please select a stock to trade');
            return;
        }
        if (tradeQuantity <= 0) {
            setError('Trade quantity must be greater than zero');
            return;
        }

        try {
            await executeTrade(selectedStock.symbol, tradeQuantity, tradeType);
            setSuccessMessage(`Successfully executed ${tradeType} for ${tradeQuantity} shares of ${selectedStock.name}`);
            setTradeQuantity(1);
            setSelectedStock(null);
        } catch (err) {
            setError('Trade execution failed');
        }
    };

    return (
        <div className="login-bg" style={{ minHeight: "100vh" }}>
            <form className="login-card animate-pop" style={{ maxWidth: 500 }} onSubmit={handleTradeExecution}>
                <div className="login-logo">
                    <span className="login-logo-circle"></span>
                    <span className="login-logo-text">Trade</span>
                </div>
                <h1 className="login-title">Trade Stocks</h1>
                <p className="login-subtitle">
                    Buy or sell stocks instantly.
                </p>
                <div className="login-group">
                    <label>Stock Symbol</label>
                    <input
                        type="text"
                        value={selectedStock ? selectedStock.symbol : ''}
                        onChange={e => setSelectedStock(e.target.value)}
                        required
                        placeholder="e.g. AAPL"
                    />
                </div>
                <div className="login-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        value={tradeQuantity}
                        min={1}
                        onChange={e => setTradeQuantity(e.target.value)}
                        required
                        placeholder="Number of shares"
                    />
                </div>
                <button type="submit" className="login-btn">Execute Trade</button>
            </form>
        </div>
    );
};

export default Trade;