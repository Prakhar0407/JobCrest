import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, []);

    return (
        <div className="browse-container">
            <Navbar />
            <div className="browse-content">
                <h1 className="browse-title">Search Results ({allJobs.length})</h1>
                <div className="job-grid">
                    {allJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;

const styles = `
.browse-container {
    padding-top: 80px;
}

.browse-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.browse-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.job-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

@media (max-width: 768px) {
    .job-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
