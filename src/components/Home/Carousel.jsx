import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const getSlider = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/slider/items/')
        // console.log(response.data);
        return response.data
    } catch (error) {
        throw error
    }
}

function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const { data, isError, isLoading } = useQuery('slider', getSlider)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [data]);

    const handleSlideIndicator = (index) => {
        setActiveSlide(index);
    };

    const handlePrevSlide = () => {
        setActiveSlide((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNextSlide = () => {
        setActiveSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div id="default-carousel" className="relative mt-5 col-span-5 md:col-span-4" data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-40 w-full overflow-hidden rounded-lg md:h-[350px]">
                {data.map((item, index) => (
                    <div key={index} className={`duration-700 ease-in-out absolute top-0 left-0 w-full h-full transition-opacity ${index === activeSlide ? '' : 'opacity-0'}`} data-carousel-item>
                        <img src={item.image} className="absolute top-0 left-0 w-full h-full" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {data.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-2 h-2 rounded-full ${index === activeSlide ? 'bg-gray-600' : 'bg-white'}`}
                        aria-current={index === activeSlide ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        data-carousel-slide-to={index}
                        onClick={() => handleSlideIndicator(index)}
                    ></button>
                ))}
            </div>
            {/* Slider controls */}
            <button type="button" className="absolute top-1/2 left-4 transform -translate-y-1/2 z-40 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full" onClick={handlePrevSlide}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button type="button" className="absolute top-1/2 right-4 transform -translate-y-1/2 z-40 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full" onClick={handleNextSlide}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

export default Carousel;
