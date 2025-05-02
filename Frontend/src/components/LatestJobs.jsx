import React, { useEffect, useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 3;

    const totalPages = Math.ceil(allJobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = allJobs.slice(startIndex, startIndex + jobsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const styles = `
            .latest-jobs-container {
                max-width: 1200px;
                margin: 60px auto;
                padding: 0 20px;
                overflow-x: hidden;
            }

            .latest-jobs-title {
                font-size: 32px;
                font-weight: bold;
                color: #222;
                text-align: center;
            }

            .highlight {
                color: #6A38C2;
            }

            .jobs-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 30px;
                justify-items: center;
            }

            .pagination-controls {
                margin-top: 30px;
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }

            .pagination-controls button {
                background-color: #6A38C2;
                color: white;
                border: none;
                padding: 10px 16px;
                font-size: 16px;
                border-radius: 8px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .pagination-controls button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }

            .pagination-controls button.active-page {
                background-color: #4a2194;
                font-weight: bold;
                border: 2px solid #fff;
            }

            .pagination-controls button:not(.active-page):hover {
                background-color: #5a2bb1;
            }

            .no-jobs-message {
                font-size: 18px;
                color: #888;
                text-align: center;
                width: 100%;
            }

            @media (max-width: 768px) {
                .latest-jobs-title {
                    font-size: 28px;
                }
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <div className="latest-jobs-container">
            <h1 className="latest-jobs-title">
                <span className="highlight">Latest</span> Job Openings
            </h1>
            <div className="jobs-grid">
                {currentJobs.length === 0 ? (
                    <span className="no-jobs-message">No Job Available Right Now</span>
                ) : (
                    currentJobs.map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>

            <div className="pagination-controls">
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                    &larr;
                </button>
                {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? 'active-page' : ''}
                        >
                            {page}
                        </button>
                    );
                })}
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default LatestJobs;
