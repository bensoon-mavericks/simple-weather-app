import Button from "@/components/button";
import Card from "@/components/card";
import { CardsSkeleton,CardSkeleton } from "@/components/skeletons";
import { useRouter } from "next/router";
import { useEffect, useState, Suspense, Component } from "react";
import useSWR from "swr";

export class ForecastData {
    public constructor(public date: string, public prediction: string) {}

}

const fetcher = (url) => fetch(url).then(async res => {
    console.log(res);
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.', {cause: await res.json()})
        throw error
    }
    return res.json()
})

const onErrorRetry = (error, key, config, revalidate, { retryCount }) => {
    // Retry after 2 seconds.
    setTimeout(() => revalidate({ retryCount }), 2000)
};

// TODO: change date string to weekday
export default function Forecast() {
    const router = useRouter()
    const { data: weatherData, error, isLoading } = useSWR('/api/forecast', fetcher, { onErrorRetry })
    console.log(weatherData)
    return (
        <div>
            <main>
                <div className="bg-[url('./public/background.jpg')] h-screen bg-cover bg-center">
                    <div className="absolute left-4 top-4">
                        <Button title="back" onClick={() => router.push("/")}></Button>
                    </div>
                    <div className="min-h-screen flex flex-col items-center justify-center">
                        <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">Predictions for the next 4 days</h1>
                        <div className="w-[60%] flex flex-row gap-4">
                            {(error || isLoading) && <CardsSkeleton />}
                            {weatherData &&
                                weatherData.items.map(data => <Card data={new ForecastData(data.date, data.prediction)} additionalClassNames="flex-1" />)
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}