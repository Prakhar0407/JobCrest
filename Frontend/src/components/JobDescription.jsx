import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="job-description-container">
            <div className="job-header">
                <div>
                    <h1 className="job-title">{singleJob?.title}</h1>
                    <div className="badge-container">
                        <Badge className="badge badge-primary">{singleJob?.postion} Positions</Badge>
                        <Badge className="badge badge-secondary">{singleJob?.jobType}</Badge>
                        <Badge className="badge badge-accent">{singleJob?.salary} LPA</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`apply-button ${isApplied ? 'disabled' : ''}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className="section-title">Job Description</h1>
            <div className="job-details">
                <h1><span className="label">Role:</span> {singleJob?.title}</h1>
                <h1><span className="label">Location:</span> {singleJob?.location}</h1>
                <h1><span className="label">Description:</span> {singleJob?.description}</h1>
                <h1><span className="label">Experience:</span> {singleJob?.experience} yrs</h1>
                <h1><span className="label">Salary:</span> {singleJob?.salary} LPA</h1>
                <h1><span className="label">Total Applicants:</span> {singleJob?.applications?.length}</h1>
                <h1><span className="label">Posted Date:</span> {singleJob?.createdAt.split("T")[0]}</h1>
            </div>
        </div>
    );
};

export default JobDescription;

const styles = `
.job-description-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 25px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #ddd;
    padding-bottom: 15px;
}

.job-title {
    font-size: 24px;
    font-weight: bold;
    color: #2a2a2a;
}

.badge-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.badge {
    font-weight: bold;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 14px;
}

.badge-primary {
    background: #007bff;
    color: white;
}

.badge-secondary {
    background: #28a745;
    color: white;
}

.badge-accent {
    background: #ff9800;
    color: white;
}

.apply-button {
    padding: 10px 20px;
    border-radius: 5px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
    border: none;
}

.apply-button:hover {
    background: linear-gradient(135deg, #571a91, #1e60d8);
}

.apply-button.disabled {
    background: gray;
    cursor: not-allowed;
}

.section-title {
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid gray;
    padding-bottom: 10px;
    margin-top: 20px;
}

.job-details {
    margin-top: 15px;
}

.label {
    font-weight: bold;
    color: #333;
    display: inline-block;
    width: 150px;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
