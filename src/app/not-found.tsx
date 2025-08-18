"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { FaRobot} from "react-icons/fa";

export default function NotFoundPage() {
  useEffect(() => {
    console.error("404 - Page Not Found");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-gray-200 p-4">
      <div className="text-center space-y-8">
        <div className="relative">
          <FaRobot className="text-green-500 text-7xl md:text-9xl mx-auto animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-500 opacity-20 animate-ping"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-green-500 [text-shadow:_0_0_10px_rgba(0,255,0,0.8)]">
          404 - Page Not Found
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-8">
          It looks like the page you were trying to reach has been corrupted or moved. Our digital sentinels are working to fix it.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-700">
            <Link href="/">
              Go Back to Home
            </Link>
          </Button>

          {/* <Button asChild className="bg-gray-800 text-green-500 border border-green-500 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-700">
            <Link href="/contact">
              <FaSearch className="mr-2" />
              Report a Broken Link
            </Link>
          </Button> */}
        </div>
        
        {/* Optional: Add a link to a sitemap or popular pages */}
        {/* <p className="text-sm text-gray-500 mt-8">
          Need help? Check our <Link href="/sitemap" className="text-green-500 hover:underline">sitemap</Link> or view our <Link href="/blog" className="text-green-500 hover:underline">latest blog posts</Link>.
        </p> */}
      </div>
    </div>
  );
}