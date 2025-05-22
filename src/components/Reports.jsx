import React, { useEffect, useState } from 'react';
import { fetchReports } from '../utils/api';
import '../styles/reports.css';

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const data = await fetchReports();
                setReports(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    if (loading) {
        return <div className="loading">Loading reports...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    // Check if the reports have asset/quantity/price fields, otherwise show available fields
    const hasTradeFields = reports.length > 0 && reports[0].asset !== undefined;

    return (
        <div className="reports-container">
            <h1>Trading Performance Reports</h1>
            <table className="reports-table">
                <thead>
                    <tr>
                        {hasTradeFields ? (
                            <>
                                <th>Date</th>
                                <th>Transaction Type</th>
                                <th>Asset</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </>
                        ) : (
                            <>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Status</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            {hasTradeFields ? (
                                <>
                                    <td>{report.date ? new Date(report.date).toLocaleDateString() : 'N/A'}</td>
                                    <td>{report.transactionType || 'N/A'}</td>
                                    <td>{report.asset || 'N/A'}</td>
                                    <td>{report.quantity !== undefined ? report.quantity : 'N/A'}</td>
                                    <td>
                                        {typeof report.price === 'number'
                                            ? report.price.toFixed(2)
                                            : 'N/A'}
                                    </td>
                                    <td>
                                        {typeof report.price === 'number' && typeof report.quantity === 'number'
                                            ? (report.quantity * report.price).toFixed(2)
                                            : 'N/A'}
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{report.date ? new Date(report.date).toLocaleDateString() : 'N/A'}</td>
                                    <td>{report.type || 'N/A'}</td>
                                    <td>{report.status || 'N/A'}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;