import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './notifications.css';

const mockNotifications = [
    {
        id: '1',
        title: 'Welcome to Crodex',
        message: 'Thank you for joining our platform!',
        timestamp: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Deposit Successful',
        message: 'Your deposit of $500 has been processed.',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
        id: '3',
        title: 'New Investment Plan',
        message: 'Check out our new Crypto Booster plan with high yields.',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
];

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setNotifications(mockNotifications);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [userId]);

    const renderNotifications = () => {
        if (loading) {
            return <div className="loading">Loading notifications...</div>;
        }

        if (notifications.length === 0) {
            return <div className="no-notifications">No notifications available</div>;
        }

        return notifications.map((notification) => (
            <div key={notification.id} className="notification">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-time">{new Date(notification.timestamp).toLocaleString()}</div>
            </div>
        ));
    };

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {renderNotifications()}
        </div>
    );
};

Notifications.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Notifications;
