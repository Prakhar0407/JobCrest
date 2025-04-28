import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const JobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: '',
    companyId: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });
        const job = res.data.job;
        setJobData({
          title: job.title,
          description: job.description,
          requirements: job.requirements.join(','),
          salary: job.salary,
          location: job.location,
          jobType: job.jobType,
          experience: job.experienceLevel,
          position: job.position,
          companyId: job.company,
        });
      } catch (err) {
        toast.error('Failed to load job');
        console.error(err);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${JOB_API_END_POINT}/update/${id}`, jobData, { withCredentials: true });
      toast.success('Job updated successfully');
      navigate('/admin/jobs');
    } catch (err) {
      toast.error('Failed to update job');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Edit Job Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Job Title</label>
        <input name="title" value={jobData.title} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Description</label>
        <textarea name="description" value={jobData.description} onChange={handleChange} rows={4} style={styles.textarea} />

        <label style={styles.label}>Requirements</label>
        <input name="requirements" value={jobData.requirements} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Salary/Stipend</label>
        <input name="salary" value={jobData.salary} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Location</label>
        <input name="location" value={jobData.location} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Job Type</label>
        <input name="jobType" value={jobData.jobType} onChange={handleChange} style={styles.input} />

        <label style={styles.label}>Experience Level</label>
        <input name="experience" value={jobData.experience} onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>Update Job</button>
      </form>
    </div>
  );
};

export default JobEdit;

const styles = {
  container: {
    maxWidth: '650px',
    margin: '50px auto',
    padding: '40px',
    backgroundColor: '#fffbe6',
    border: '2px solid #ffe58f',
    borderRadius: '14px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#d4a300',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  label: {
    fontSize: '14px',
    color: '#333',
    marginBottom: '-8px',
    fontWeight: '600',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ffd95a',
    backgroundColor: '#fffde0',
    fontSize: '15px',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ffd95a',
    backgroundColor: '#fffde0',
    fontSize: '15px',
    resize: 'vertical',
    outline: 'none',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#ffd700',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};
