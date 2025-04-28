import React, { useEffect } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

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
            
            .no-jobs-message {
                font-size: 18px;
                color: #888;
                text-align: center;
                width: 100%;
            }
            
            .job-card {
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
                padding: 20px;
                border: 1px solid #e0e0e0;
                transition: all 0.3s ease-in-out;
                max-width: 400px;
                text-align: center;
            }
            
            .job-card:hover {
                box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
                transform: translateY(-4px);
            }
            
            .job-title {
                font-size: 20px;
                font-weight: bold;
                color: #222;
                margin-bottom: 8px;
            }
            
            .job-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                margin-top: 15px;
            }
            
            .tag-blue {
                background-color: rgba(0, 123, 255, 0.15);
                color: #007bff;
                padding: 6px 12px;
                font-size: 13px;
                font-weight: 600;
                border-radius: 8px;
            }
            
            .tag-red {
                background-color: rgba(248, 48, 2, 0.15);
                color: #F83002;
                padding: 6px 12px;
                font-size: 13px;
                font-weight: 600;
                border-radius: 8px;
            }
            
            .tag-green {
                background-color: rgba(34, 197, 94, 0.2);
                color: #22c55e;
                padding: 8px 14px;
                font-size: 14px;
                font-weight: 600;
                border-radius: 8px;
            }
            
            .salary-tag {
                background-color: rgba(255, 193, 7, 0.2);
                color: #ff9800;
                padding: 8px 14px;
                font-size: 14px;
                font-weight: 600;
                border-radius: 8px;
            }
            
            .tech-tag {
                background-color: rgba(103, 58, 183, 0.2);
                color: #673AB7;
                padding: 8px 14px;
                font-size: 14px;
                font-weight: 600;
                border-radius: 8px;
            }
            
            @media (max-width: 1024px) {
                .jobs-grid {
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                }
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
                {
                    allJobs.length <= 0 ? 
                    <span className="no-jobs-message">No Job Available Right Now</span> : 
                    allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    );
};

export default LatestJobs;
