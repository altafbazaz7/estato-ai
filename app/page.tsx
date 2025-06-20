"use client";

import { useRouter } from "next/navigation";
import useUserLocation from "@/app/hooks/useUserlocation";

export default function Home() {
  const router = useRouter();
  const [location, detectLocation] = useUserLocation();

  const handleBrowseClick = async () => {
    try {
      if (!location) {
        await detectLocation();
      }
    } catch (err) {
      console.warn("Could not get location:", err);
    } finally {
      router.push("/properties");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-4xl">
        <div className="flex items-center gap-3">
        
          <h1 className="text-2xl font-bold">Estato AI</h1>
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-semibold tracking-tight mb-2">Find your dream home</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl">
            Rent or purchase premium properties in your favorite cities. Simple, fast, and reliable.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full">
          <button
            onClick={handleBrowseClick}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-6 flex items-center justify-center w-full sm:w-auto"
          >
            Browse Listings
          </button>
          <a
            className="rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm sm:text-base h-10 sm:h-12 px-6 flex items-center justify-center w-full sm:w-auto"
            href="/contact"
          >
            Chat With Estato AI Agent
          </a>
        </div>
      </main>

     
    </div>
  );
}
