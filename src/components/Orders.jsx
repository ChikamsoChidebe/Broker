import React, { useEffect, useState } from 'react';
import { fetchOrderHistory } from '../utils/api';
import OrderTable from './OrderTable';
import OrderFilters from './OrderFilters';
import Pagination from './Pagination';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ status: 'all', dateRange: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await fetchOrderHistory(filters);
                setOrders(fetchedOrders);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            <OrderFilters filters={filters} onFilterChange={handleFilterChange} />
            <OrderTable orders={currentOrders} />
            <Pagination 
                totalOrders={orders.length} 
                ordersPerPage={ordersPerPage} 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
            />
        </div>
    );
};

export default Orders;