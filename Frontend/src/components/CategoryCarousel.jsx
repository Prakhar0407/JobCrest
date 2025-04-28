import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Sales Manager",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const slideLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -250, behavior: 'smooth' });
        }
    };

    const slideRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

    return (
        <div style={styles.carouselWrapper}>
            {/* Left Arrow */}
            <button onClick={slideLeft} style={{ ...styles.arrowButton, left: '-45px' }}>
                <ChevronLeft size={24} />
            </button>

            <div style={styles.carouselContainer} ref={carouselRef}>
                {category.map((cat, index) => (
                    <div key={index} style={styles.carouselItem}>
                        <Button 
                            onClick={() => searchJobHandler(cat)} 
                            style={styles.categoryButton}
                        >
                            {cat}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button onClick={slideRight} style={{ ...styles.arrowButton, right: '-45px' }}>
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default CategoryCarousel;

// 🔹 Inline Styles
const styles = {
    carouselWrapper: {
        width: '100%',
        maxWidth: '900px',
        margin: '50px auto',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselContainer: {
        display: 'flex',
        gap: '15px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',  // Hide scrollbar
        whiteSpace: 'nowrap',
        scrollBehavior: 'smooth',
        width: '100%',
        padding: '10px',
    },
    carouselItem: {
        flex: 'none',
        scrollSnapAlign: 'center',
    },
    categoryButton: {
        background: 'black',
        color: 'yellow',
        fontWeight: 'bold',
        borderRadius: '20px',
        padding: '12px 18px',
        transition: '0.3s ease-in-out',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
    },
    arrowButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'black',
        color: 'yellow',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
};
