import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2, Eye } from 'lucide-react';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div style={styles.container}>
      {filterJobs?.map((job) => (
        <div key={job._id} style={styles.card}>
          <div>
            <h2 style={styles.title}>{job?.title}</h2>
            <p style={styles.company}>{job?.company?.name}</p>
            <p style={styles.date}>Posted on: {job?.createdAt.split("T")[0]}</p>
          </div>
          <div style={styles.actions}>
            <button
              onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
              style={styles.button}
            >
              <Edit2 size={16} /> Edit
            </button>
            <button
              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
              style={styles.button}
            >
              <Eye size={16} /> Applicants
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminJobsTable;

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    padding: '30px',
  },
  card: {
    backgroundColor: '#FFFBE6',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '200px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '8px',
  },
  company: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '4px',
  },
  date: {
    fontSize: '13px',
    color: '#999',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  button: {
    backgroundColor: '#FFD700',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 'bold',
    color: '#333',
  },
};
