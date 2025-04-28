import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="hero-container">
            <div className="hero-content">
                <span className="tagline">Land Your Perfect Job Today!</span>
                <h1 className="hero-title">
                    Find & Apply for <span className="highlight">Top Jobs</span> with Ease!
                </h1>
                <p className="hero-subtext">Discover the best opportunities tailored just for you.</p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for jobs..."
                        onChange={(e) => setQuery(e.target.value)}
                        className="search-input"
                    />
                    <button onClick={searchJobHandler} className="search-button">
                        <Search className="search-icon" />
                        <span className="search-text">Search</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;

const styles = `
.hero-container {
    width: 100%;
    background: linear-gradient(to right, #ffcc00, #ff9900);
    padding: 80px 0;
    display: flex;
    justify-content: center;
    text-align: center;
    color: white;
}

.hero-content {
    max-width: 700px;
    width: 90%;
}

.tagline {
    display: inline-block;
    padding: 8px 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 20px;
    text-transform: uppercase;
}

.hero-title {
    font-size: 42px;
    font-weight: bold;
    margin-top: 15px;
    color: white;
}

.highlight {
    color: #222;
    background: rgba(255, 255, 255, 0.3);
    padding: 5px 10px;
    border-radius: 8px;
}

.hero-subtext {
    font-size: 18px;
    color: #f3f3f3;
    margin-top: 10px;
}

.search-container {
    display: flex;
    width: 100%;
    max-width: 450px;
    margin: 20px auto;
    border-radius: 50px;
    overflow: hidden;
    background: white;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.15);
}

.search-input {
    flex: 1;
    padding: 14px 20px;
    font-size: 16px;
    border: none;
    outline: none;
    color: #333;
    border-radius: 50px 0 0 50px;
}

.search-button {
    background: linear-gradient(to right, #ff5500, #ff8800);
    padding: 14px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    border-radius: 0 50px 50px 0;
    transition: 0.3s;
}

.search-button:hover {
    background: linear-gradient(to right, #e64a00, #ff6600);
}

.search-icon {
    width: 20px;
    height: 20px;
    color: white;
}

.search-text {
    font-size: 14px;
    font-weight: bold;
    color: white;
    display: inline-block;
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 32px;
    }
    .search-container {
        max-width: 90%;
    }
}
`;

// Inject CSS into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
