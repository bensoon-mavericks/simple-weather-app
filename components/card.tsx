import { ForecastData } from '@/pages/forecast';
import { WeatherData } from '@/pages/now';
import React from 'react';

// TODO see if instead of using classes for the data,
// see if we can use interfaces
// what's the proper of dealing with types 
interface CardProps {
    data: WeatherData | ForecastData,
    additionalClassNames?: string
}

const Card: React.FC<CardProps> = ({ data, additionalClassNames }) => {
    return (
        <div className={`opacity-80 bg-gray-300 max-w-sm rounded-lg shadow-md overflow-hidden ${additionalClassNames}`}>
            <div className="p-4">
                <h2 className="text-gray-700 text-xl font-semibold mb-2">{ data instanceof WeatherData ? data.area : data.date }</h2>
                <p className="text-gray-700">{data instanceof WeatherData ? data.forecast : data.prediction }</p>
            </div>
        </div>
    );
};

export default Card;