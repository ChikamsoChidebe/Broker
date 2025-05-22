import React from 'react';
import PropTypes from 'prop-types';
import './orderfilters.css';

const OrderFilters = ({
    filterStatus,
    filterType,
    filterSymbol,
    onStatusChange,
    onTypeChange,
    onSymbolChange,
    onReset,
    symbols = [],
    types = [],
    statuses = [],
}) => {
    return (
        <div className="order-filters-container">
            <div className="order-filter-group">
                <label htmlFor="symbol-filter">Symbol:</label>
                <select
                    id="symbol-filter"
                    value={filterSymbol}
                    onChange={e => onSymbolChange(e.target.value)}
                >
                    <option value="">All</option>
                    {symbols.map(symbol => (
                        <option key={symbol} value={symbol}>{symbol}</option>
                    ))}
                </select>
            </div>
            <div className="order-filter-group">
                <label htmlFor="type-filter">Type:</label>
                <select
                    id="type-filter"
                    value={filterType}
                    onChange={e => onTypeChange(e.target.value)}
                >
                    <option value="">All</option>
                    {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="order-filter-group">
                <label htmlFor="status-filter">Status:</label>
                <select
                    id="status-filter"
                    value={filterStatus}
                    onChange={e => onStatusChange(e.target.value)}
                >
                    <option value="">All</option>
                    {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <button className="order-filter-reset-btn" onClick={onReset}>
                Reset Filters
            </button>
        </div>
    );
};

OrderFilters.propTypes = {
    filterStatus: PropTypes.string,
    filterType: PropTypes.string,
    filterSymbol: PropTypes.string,
    onStatusChange: PropTypes.func.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onSymbolChange: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    symbols: PropTypes.array,
    types: PropTypes.array,
    statuses: PropTypes.array,
};

export default OrderFilters;