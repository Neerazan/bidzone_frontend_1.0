import React, { useState, useEffect } from 'react';

function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);

    const data = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fHww',
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1690218764759-e3b29e9e5bcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
        },
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // Change slide every 3 seconds

        return () => {
            clearInterval(intervalId);
        };
    }, [data.length]);

    const handleSlideIndicator = (index) => {
        setActiveSlide(index);
    };

    const handlePrevSlide = () => {
        setActiveSlide((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNextSlide = () => {
        setActiveSlide((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div id="default-carousel" className="relative w-2/3 mt-5 mx-auto" data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-80">
                {data.map((item, index) => (
                    <div key={index} className={`duration-700 ease-in-out absolute top-0 left-0 w-full h-full transition-opacity ${index === activeSlide ? '' : 'opacity-0'}`} data-carousel-item>
                        <img src={item.src} className="absolute top-0 left-0 w-full h-full object-cover" alt={`Slide ${index + 1}`} />
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
            <button type="button" className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full" onClick={handlePrevSlide}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button type="button" className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50 text-white bg-gray-800 bg-opacity-50 p-2 rounded-full" onClick={handleNextSlide}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

export default Carousel;
