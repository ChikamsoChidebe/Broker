import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                className={i === currentPage ? 'active' : ''}
                onClick={() => onPageChange(i)}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="pagination">
            {pages}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;