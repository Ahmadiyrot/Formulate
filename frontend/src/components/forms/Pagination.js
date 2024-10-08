import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxVisiblePages = 3; 
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxVisiblePages / 2);
            endPage = currentPage + Math.floor(maxVisiblePages / 2);
        }
    }

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <nav>
            <ul className="pagination">
                {startPage > 1 && (
                    <>
                        <li className="page-item" onClick={() => handlePageClick(1)}>
                            <span className="page-link">1</span>
                        </li>
                        {startPage > 2 && <span className="page-link">...</span>}
                    </>
                )}
                {[...Array(endPage - startPage + 1)].map((_, index) => (
                    <li key={startPage + index} className={`page-item ${currentPage === startPage + index ? 'active' : ''}`} onClick={() => handlePageClick(startPage + index)}>
                        <span className="page-link">{startPage + index}</span>
                    </li>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="page-link">...</span>}
                        <li className="page-item" onClick={() => handlePageClick(totalPages)}>
                            <span className="page-link">{totalPages}</span>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
