import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const checkIfJobIsSaved = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/saved`, {
                    withCredentials: true
                });

                const savedJobs = response.data.savedJobs || [];
                const alreadySaved = savedJobs.some(savedJob => savedJob._id === job._id);
                setIsSaved(alreadySaved);
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            }
        };

        checkIfJobIsSaved();
    }, [job._id]);


    const handleSaveJob = async (jobId) => {
        setIsSaved(true); // Immediately update UI
    
        try {
            await axios.post(
                `${JOB_API_END_POINT}/save`,
                { jobId },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Failed to save job:", error);
        }
    };
    

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    useEffect(() => {
        if (!document.getElementById('job-card-styles')) {
            const styles = `
                .job-card {
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
                    padding: 24px;
                    margin-top: 80px;
                    border: 1px solid #e0e0e0;
                    transition: all 0.3s ease-in-out;
                    max-width: 450px;
                    word-wrap: break-word;
                    overflow: hidden;
                }

                .job-card:hover {
                    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
                    transform: translateY(-4px);
                }

                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .job-time {
                    font-size: 14px;
                    color: #888;
                    font-weight: 500;
                }

                .bookmark-btn {
                    border-radius: 50%;
                    padding: 8px;
                    transition: background 0.2s ease-in-out;
                }

                .bookmark-btn:hover {
                    background: rgba(0, 0, 0, 0.1);
                }

                .job-company {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin: 20px 0;
                    flex-wrap: wrap;
                }

                .company-logo {
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #ddd;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.3s ease-in-out;
                }

                .company-logo:hover {
                    transform: scale(1.1);
                }

                .company-name {
                    font-weight: 700;
                    font-size: 20px;
                    color: #333;
                    max-width: 250px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                .company-location {
                    font-size: 14px;
                    color: #666;
                }

                .job-details {
                    margin: 15px 0;
                }

                .job-title {
                    font-size: 22px;
                    font-weight: bold;
                    color: #222;
                    margin-bottom: 8px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 100%;
                }

                .job-description {
                    font-size: 14px;
                    color: #444;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    line-height: 1.6;
                }

                .job-tags {
                    display: flex;
                    gap: 12px;
                    margin-top: 12px;
                    flex-wrap: wrap;
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

                .tag-purple {
                    background-color: rgba(114, 9, 183, 0.15);
                    color: #7209b7;
                    padding: 6px 12px;
                    font-size: 13px;
                    font-weight: 600;
                    border-radius: 8px;
                }

                .job-buttons {
                    display: flex;
                    gap: 12px;
                    margin-top: 20px;
                    flex-wrap: wrap;
                }

                .save-btn {
                    background-color: green;
                    color: white;
                    font-weight: 600;
                    padding: 10px 16px;
                    border-radius: 8px;

                }

                .save-btn:hover {
                    background-color: #27ae60 !important;
                }

                .saved {
                    background-color: #d4d4d4;
                    color: #555;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .job-card {
                        max-width: 92%;
                        margin: 20px auto;
                    }
                }
            `;

            const styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.id = "job-card-styles";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);
        }
    }, []);

    return (
        <div className="job-card">
            <div className="job-header">
                <p className="job-time">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>

                <Button
    className={`save-btn ${isSaved ? "saved" : ""}`}
    onClick={() => handleSaveJob(job._id)}
    disabled={isSaved}
>
    {isSaved ? "✔️" : "Save For Later"}
</Button>


            </div>

            <div className="job-company">
                <Button className="company-logo" variant="outline">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="company-name">{job?.company?.name}</h1>
                    <p className="company-location">India</p>
                </div>
            </div>

            <div className="job-details">
                <h1 className="job-title">{job?.title}</h1>
                <p className="job-description">{job?.description}</p>
            </div>

            <div className="job-tags">
                <Badge className="tag-blue">{job?.position} Positions</Badge>
                <Badge className="tag-red">{job?.jobType}</Badge>
                <Badge className="tag-purple">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
};

export default Job;
