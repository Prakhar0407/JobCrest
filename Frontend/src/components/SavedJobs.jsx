import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/saved`, { withCredentials: true });
        setSavedJobs(res.data.savedJobs);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleUnsave = async (jobId) => {
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/saved/${jobId}`, {
        withCredentials: true,
      });
  
      // If successful, remove it from state
      if (res.status === 200) {
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      }
    } catch (error) {
      console.error('Error unsaving job:', error);
    }
  };
  

  return (
    <div className="saved-jobs-container">
      <h1 className="saved-title">📌 Saved Jobs</h1>
      <div className="saved-jobs-grid">
        {savedJobs.length === 0 ? (
          <p className="no-jobs">You haven’t saved any jobs yet.</p>
        ) : (
          savedJobs.map((job) => (
            <div key={job._id} className="saved-job-card">
              <h2>{job.title}</h2>
              <p>{job.company?.name}</p>
              <p>{job.location}</p>
              <div className="button-group">
                <button onClick={() => navigate(`/description/${job._id}`)}>View Details</button>
                <button className="unsave-btn" onClick={() => handleUnsave(job._id)}>Unsave</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedJobs;

// Style
const styles = `
.saved-jobs-container {
  padding: 40px;
  background-color: #fffdf0;
  min-height: 100vh;
}

.saved-title {
  font-size: 32px;
  color: #eab308;
  margin-bottom: 30px;
  text-align: center;
}

.saved-jobs-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.saved-job-card {
  background-color: #fff9d6;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.saved-job-card:hover {
  transform: translateY(-5px);
}

.saved-job-card h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.saved-job-card p {
  color: #666;
  margin-bottom: 8px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.saved-job-card button {
  background-color: #facc15;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
}

.unsave-btn {
  background-color: #f87171; /* red-400 */
  color: white;
}

.no-jobs {
  font-size: 18px;
  color: #999;
  text-align: center;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
