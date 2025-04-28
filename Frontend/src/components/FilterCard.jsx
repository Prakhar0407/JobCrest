import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Role",
        array: ["All", "Software Engineer", "Data Analyst", "Frontend Developer", "Backend Developer", "FullStack Developer"],
        highlight: true
    },
    {
        filterType: "Location",
        array: ["All", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
        highlight: true
    },
    {
        filterType: "Salary",
        array: ["All", "0-50k", "50-2lakh"],
        highlight: true
    },
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const dispatch = useDispatch();

    const changeHandler = (filterType, value) => {
        const updated = {
            ...selectedFilters,
            [filterType]: value === "All" ? "" : value
        };
        setSelectedFilters(updated);
    };

    useEffect(() => {
        const activeFilters = Object.values(selectedFilters).filter(Boolean);
        dispatch(setSearchedQuery(activeFilters));
    }, [selectedFilters]);

    return (
        <div className="filter-card">
            <h1 className="filter-title">Filter Jobs</h1>
            <hr className="filter-divider" />
            {filterData.map((data, index) => (
                <div key={index} className="filter-group">
                    <h1 className={`filter-group-title ${data.highlight ? 'highlight-title' : ''}`}>
                        {data.filterType}
                    </h1>
                    <RadioGroup
                        value={selectedFilters[data.filterType] || "All"}
                        onValueChange={(val) => changeHandler(data.filterType, val)}
                    >
                        <div className="filter-box">
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div key={idx} className="filter-option">
                                        <RadioGroupItem value={item} id={itemId} className="radio-input" />
                                        <Label htmlFor={itemId} className="radio-label">{item}</Label>
                                    </div>
                                );
                            })}
                        </div>
                    </RadioGroup>
                    {index < filterData.length - 1 && <hr className="filter-section-divider" />}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;

// CSS injection
const styles = `
.filter-card {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.08);
    padding: 20px;
    width: 100%;
    transition: all 0.3s ease-in-out;
    border: 2px solid #e0e0e0;
}

.filter-card:hover {
    box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.12);
}

.filter-title {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    text-align: center;
}

.filter-divider {
    margin: 10px 0;
    border-top: 2px solid #e0e0e0;
}

.filter-group {
    margin: 15px 0;
}

.filter-group-title {
    font-size: 16px;
    font-weight: 700;
    color: #444;
    margin-bottom: 8px;
}

.highlight-title {
    color: #FFC107;
    font-weight: 800;
}

.filter-box {
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    padding: 10px;
    background: #f9f9f9;
}

.filter-option {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 8px 0;
    padding: 8px;
    border-radius: 6px;
    transition: background 0.2s ease-in-out;
}

.filter-option:hover {
    background: rgba(0, 0, 0, 0.05);
}

.filter-section-divider {
    margin: 15px 0;
    border-top: 2px dashed #e0e0e0;
}

.radio-input {
    cursor: pointer;
}

.radio-label {
    font-size: 14px;
    font-weight: 600;
    color: #555;
    cursor: pointer;
}

@media (max-width: 768px) {
    .filter-card {
        max-width: 95%;
        margin: 20px auto;
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
