import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div className="applicants-page">
            <Navbar />
            <div className='content-container'>
                <h1 className='heading'>
                    Applicants <span className="count">({applicants?.applications?.length || 0})</span>
                </h1>
                <ApplicantsTable />
            </div>

            <style jsx>{`
                .applicants-page {
                    margin : 80px auto;
                    background-color: #fffbea;
                    min-height: 100vh;
                }

                .content-container {
                    max-width: 1120px;
                    margin: 0 auto;
                    padding: 1.5rem;
                }

                .heading {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin: 1rem 0;
                    color: #ca8a04;
                    display: flex;
                    align-items: center;
                }

                .count {
                    margin-left: 0.5rem;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #f59e0b;
                }
            `}</style>
        </div>
    )
}

export default Applicants;
