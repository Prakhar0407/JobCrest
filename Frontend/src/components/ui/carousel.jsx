import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Mumbai"],
        highlight: true
    },
    {
        filterType: "Role",
        array: ["Software Engineer", "Data Analyst", "Frontend Developer", "Backend Developer", "FullStack Developer"],
        highlight: true
    },
    {
        filterType: "Salary",
        array: ["0-50k", "50-2lakh"],
        highlight: true
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState(new Set());
    const dispatch = useDispatch();

    const toggleFilter = (value) => {
        const updatedFilters = new Set(selectedFilters);
        if (updatedFilters.has(value)) {
            updatedFilters.delete(value);
        } else {
            updatedFilters.add(value);
        }
        setSelectedFilters(updatedFilters);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(Array.from(selectedFilters))); // You can customize how this is handled in Redux
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
                    <div className="filter-box">
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={idx} className="filter-option">
                                    <input
                                        type="checkbox"
                                        id={itemId}
                                        value={item}
                                        checked={selectedFilters.has(item)}
                                        onChange={() => toggleFilter(item)}
                                        className="checkbox-input"
                                    />
                                    <Label htmlFor={itemId} className="radio-label">{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                    {index < filterData.length - 1 && <hr className="filter-section-divider" />}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
