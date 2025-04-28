import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    }

    return (
        <div className="applicants-container">
            <h2 className="heading">Applicants</h2>
            <div className="cards-wrapper">
                {
                    applicants?.applications?.map((item) => (
                        <div className="card" key={item._id}>
                            <div className="card-row">
                                <span className="label">Name:</span>
                                <span>{item?.applicant?.fullname}</span>
                            </div>
                            <div className="card-row">
                                <span className="label">Email:</span>
                                <span>{item?.applicant?.email}</span>
                            </div>
                            <div className="card-row">
                                <span className="label">Phone:</span>
                                <span>{item?.applicant?.phoneNumber}</span>
                            </div>
                            <div className="card-row">
                                <span className="label">Resume:</span>
                                {
                                    item.applicant?.profile?.resume ? (
                                        <a
                                            className="resume-link"
                                            href={item?.applicant?.profile?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : <span>NA</span>
                                }
                            </div>
                            <div className="card-row">
                                <span className="label">Date:</span>
                                <span>{item?.applicant?.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="card-actions">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="cursor-pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        {
                                            shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => statusHandler(status, item?._id)}
                                                    className="popover-option"
                                                >
                                                    <span>{status}</span>
                                                </div>
                                            ))
                                        }
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    ))
                }
            </div>

            <style jsx>{`
                .applicants-container {
                    padding: 1rem;
                }

                .heading {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .cards-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .card {
                    background-color: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.75rem;
                    padding: 1rem;
                    width: 100%;
                    max-width: 350px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    position: relative;
                }

                .card-row {
                    display: flex;
                    gap: 0.5rem;
                }

                .label {
                    font-weight: 600;
                    color: #374151;
                }

                .resume-link {
                    color: #2563eb;
                    text-decoration: underline;
                    font-weight: 500;
                }

                .resume-link:hover {
                    color: #1d4ed8;
                }

                .card-actions {
                    position: absolute;
                    top: 0.75rem;
                    right: 0.75rem;
                }

                .popover-option {
                    padding: 6px 12px;
                    border-radius: 4px;
                }

                .popover-option:hover {
                    background-color: #facc15;
                    color: black;
                    font-weight: 500;
                }
            `}</style>
        </div>
    )
}

export default ApplicantsTable;
