import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ordertable.css';
const OrderTable = ({ orders }) => {
    return (
        <div className="order-table-container">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>Side</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Placed At</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.symbol}</td>
                                <td>{order.type}</td>
                                <td>{order.side}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td className={`order-status ${order.status.toLowerCase()}`}>{order.status}</td>
                                <td>{new Date(order.placedAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="no-orders">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

OrderTable.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            symbol: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            side: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            placedAt: PropTypes.string.isRequired,
        })
    ),
};

export default OrderTable;