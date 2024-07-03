import Button from "@/components/button";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter()
    return (
        <div>
            <Head>
                <title>Simple Weather App</title>
            </Head>
            <main>
                <div className="bg-[url('./public/background.jpg')] h-screen bg-cover bg-center">
                    <div className="min-h-screen flex flex-col items-center justify-center">
                        <h1 className="text-6xl text-center font-bold pb-24 text-gray-700">Simple Weather App</h1>
                        <div className="w-[50%] flex flex-row gap-24">
                            <Button title="Now" onClick={() => router.push("/now")} />
                            <Button title="Forecast" onClick={() => { router.push("/forecast")}} />
                        </div>
                    </div>
                </div>
            </main>
        </div>)
}