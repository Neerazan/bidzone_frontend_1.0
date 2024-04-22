import React, { useState, useEffect } from 'react';

const CountdownComponent = ({ apiDate }) => {
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const apiDateObject = new Date(apiDate);
            const differenceMs = apiDateObject - currentDate;

            if (differenceMs > 0) {
                const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
                const hours = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

                setRemainingTime({ days, hours, minutes, seconds });
            } else {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [apiDate]);

    if (!remainingTime) {
        return null;
    }

    if (remainingTime.days <= 0 && remainingTime.hours <= 0 && remainingTime.minutes <= 0 && remainingTime.seconds <= 0) {
        return <div>Ended</div>;
    } else {
        // Format the days, hours, minutes, and seconds to always display two digits
        const formattedDays = remainingTime.days.toString().padStart(2, '0');
        const formattedHours = remainingTime.hours.toString().padStart(2, '0');
        const formattedMinutes = remainingTime.minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingTime.seconds.toString().padStart(2, '0');

        return (
            <div className="flex items-center justify-center w-full gap-6 count-down-main">
                <div className="timer">
                    <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
                        <h3 className="countdown-element days font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                            {formattedDays}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-900 mt-1 text-center w-full font-semibold">days</p>
                </div>
                <div className="timer">
                    <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
                        <h3 className="countdown-element hours font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                            {formattedHours}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-900 mt-1 text-center w-full font-semibold">hours</p>
                </div>
                <div className="timer">
                    <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
                        <h3 className="countdown-element minutes font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                            {formattedMinutes}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-900 mt-1 text-center w-full font-semibold">minutes</p>
                </div>
                <div className="timer">
                    <div className="pr-1.5 pl-2 relative bg-indigo-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
                        <h3 className="countdown-element seconds font-manrope font-semibold text-2xl text-indigo-600 tracking-[15.36px] max-w-[44px] text-center relative z-20">
                            {formattedSeconds}
                        </h3>
                    </div>
                    <p className="text-sm text-gray-900 mt-1 text-center w-full font-semibold">seconds</p>
                </div>
            </div>
        );
    }
};

export default CountdownComponent;
