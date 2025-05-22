// MOCK DATA FOR DEVELOPMENT

// Function to fetch market data
export const fetchMarketData = async () => {
    // Simulate network delay
    await new Promise(res => setTimeout(res, 300));
    return [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 180.5, change: 1.2 },
        { symbol: 'GOOG', name: 'Alphabet Inc.', price: 2700.1, change: -5.3 },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 700.2, change: 3.1 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3300.8, change: -2.7 }
    ];
};

// Function to fetch user account details
export const fetchUserAccount = async () => {
    await new Promise(res => setTimeout(res, 300));
    return {
        id: 'user123',
        name: 'John Doe',
        email: 'john@example.com',
        balance: 10000,
        accountType: 'Individual',
        createdAt: '2022-01-01'
    };
};

// Function to update user account details
export const updateAccountDetails = async (accountData) => {
    await new Promise(res => setTimeout(res, 300));
    return { ...accountData, updated: true };
};

// Function to fetch user portfolio
export const fetchUserPortfolio = async () => {
    await new Promise(res => setTimeout(res, 300));
    return [
        { symbol: 'AAPL', name: 'Apple Inc.', quantity: 20, value: 3610, change: 1.2 },
        { symbol: 'GOOG', name: 'Alphabet Inc.', quantity: 5, value: 13500, change: -5.3 },
        { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 10, value: 7002, change: 3.1 }
    ];
};

// Function to fetch order history
export const fetchOrderHistory = async (filters = {}) => {
    await new Promise(res => setTimeout(res, 300));
    return [
        {
            id: 'ORD001',
            symbol: 'AAPL',
            type: 'Limit',
            side: 'Buy',
            quantity: 10,
            price: 180.0,
            status: 'Completed',
            placedAt: '2024-06-01T10:00:00Z'
        },
        {
            id: 'ORD002',
            symbol: 'GOOG',
            type: 'Market',
            side: 'Sell',
            quantity: 2,
            price: 2705.0,
            status: 'Pending',
            placedAt: '2024-06-02T11:30:00Z'
        }
    ];
};

// Function to execute a trade
export const executeTrade = async (tradeData) => {
    await new Promise(res => setTimeout(res, 300));
    return { success: true, trade: tradeData, message: 'Trade executed successfully.' };
};

// Function to fetch reports
export const fetchReports = async () => {
    await new Promise(res => setTimeout(res, 300));
    return [
        {
            id: 'REP001',
            type: 'Monthly Statement',
            date: '2024-05-31',
            status: 'Completed'
        },
        {
            id: 'REP002',
            type: 'Tax Document',
            date: '2024-04-15',
            status: 'Completed'
        }
    ];
};

// Function to fetch notifications
export const fetchNotifications = async (userId) => {
    await new Promise(res => setTimeout(res, 300));
    return [
        {
            id: 'NTF001',
            title: 'Order Executed',
            message: 'Your order for AAPL has been executed.',
            timestamp: '2024-06-01T10:05:00Z'
        },
        {
            id: 'NTF002',
            title: 'Dividend Received',
            message: 'You received a dividend from TSLA.',
            timestamp: '2024-05-28T09:00:00Z'
        }
    ];
};