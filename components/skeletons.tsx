import React from "react";

const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent';
interface CardProps {
    additionalClassNames?: string
}
export const CardsSkeleton = () => {
    return (
        <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </>
    )
}

export const CardSkeleton: React.FC<CardProps> = ({additionalClassNames}) => {
    return (
        <div className={`${shimmer} relative opacity-80 bg-gray-300 w-full rounded-lg shadow-md overflow-hidden ${additionalClassNames}`}>
            <div className="p-3">
                <div className="bg-gray-400 rounded-md h-7 w-3/5 mb-3 mt-1" />
                <div className="bg-gray-400 rounded-md h-5 w-2/5" />
            </div>
        </div>
    );
};