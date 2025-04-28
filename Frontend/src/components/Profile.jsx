import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />

            <div className="profile-page-layout">
                <div className='profile-container'>
                    <div className='profile-header'>
                        <div className='profile-info'>
                            <Avatar className="avatar">
                                <AvatarImage
                                    src={
                                        user?.profile?.profilePhoto ||
                                        `https://ui-avatars.com/api/?name=${user?.fullname}`
                                    }
                                    alt="profile"
                                />
                            </Avatar>
                            <div>
                                <h1 className='name'>{user?.fullname}</h1>
                                <p className='bio'>{user?.profile?.bio}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="edit-button" variant="outline">
                            <Pen />
                        </Button>
                    </div>

                    <div className='profile-contact'>
                        <div className='contact-row'>
                            <Mail className="icon" />
                            <span>{user?.email}</span>
                        </div>
                        <div className='contact-row'>
                            <Contact className="icon" />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='profile-section'>
                        <h2 className='section-title'>Skills</h2>
                        <div className='skill-badges'>
                            {user?.profile?.skills.length !== 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge key={index} className="yellow-badge">
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span>NA</span>
                            )}
                        </div>
                    </div>

                    <div className='resume-section'>
                        <Label className="resume-label">Resume</Label>
                        {isResume ? (
                            <a target="_blank" href={user?.profile?.resume} className='resume-link'>
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>

                <div className='applied-jobs'>
                    <h1 className='section-title'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />

            <style jsx>{`
                .profile-page-layout {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 32px;
                    margin-top: 80px;
                    padding: 0 24px;
                    flex-wrap: wrap;
                }

                .profile-container {
                    width: 30%;
                    padding: 24px;
                    background-color: #ffffff;
                    border: 2px solid #facc15;
                    border-radius: 16px;
                }

                .applied-jobs {
                    width: 60%;
                    background-color: #ffffff;
                    border: 2px solid #facc15;
                    border-radius: 16px;
                    padding: 24px;
                }

                .profile-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .profile-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .avatar {
                    height: 96px;
                    width: 96px;
                }

                .name {
                    font-size: 20px;
                    font-weight: 600;
                }

                .bio {
                    color: #4b5563;
                }

                .edit-button {
                    border-color: #facc15;
                    color: #facc15;
                }

                .edit-button:hover {
                    background-color: #facc15;
                    color: #fff;
                }

                .profile-contact {
                    margin-top: 24px;
                }

                .contact-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                    color: #374151;
                }

                .icon {
                    color: #facc15;
                }

                .profile-section {
                    margin-top: 32px;
                }

                .section-title {
                    font-size: 18px;
                    font-weight: 600;
                    color: #ca8a04;
                    margin-bottom: 8px;
                }

                .skill-badges {
                    display: flex;
                    gap: 8px;
                    flex-wrap: wrap;
                }

                .yellow-badge {
                    background-color: #fef9c3;
                    color: #ca8a04;
                    border: 1px solid #facc15;
                }

                .resume-section {
                    margin-top: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .resume-label {
                    font-size: 16px;
                    font-weight: 600;
                    color: #ca8a04;
                }

                .resume-link {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Profile;
