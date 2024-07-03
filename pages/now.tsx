import Button from "@/components/button";
import Card from "@/components/card";
import { CardsSkeleton,CardSkeleton } from "@/components/skeletons";
import { useRouter } from "next/router";
import { useEffect, useState, Suspense, Component } from "react";
import useSWR from "swr";

// TODO: find better way of refreshing the data
// currently not consistent
// enter the page then it makes the call again currently, but should it do that

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


export default function Now() {
    const router = useRouter()
    const { data: weatherData, error, isLoading } = useSWR('/api/now', fetcher, { onErrorRetry })

    return (
        <div>
            <main>
                <div className="bg-[url('./public/background.jpg')] h-screen bg-cover bg-center">
                    <div className="absolute left-4 top-4">
                        <Button title="back" onClick={() => router.push("/")}></Button>
                    </div>
                    <div className="min-h-screen flex flex-col items-center justify-center">
                        <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">What's it like outside?</h1>
                        <div className="w-[60%] flex flex-row gap-4">
                            {(error || isLoading) && <CardsSkeleton />}
                            {weatherData &&
                                weatherData.items.map(data => <Card weatherData={data} additionalClassNames="flex-1" />)
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}