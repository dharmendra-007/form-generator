"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorPageProps {
  error: Error;
}

function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-gray-200 p-4">
      <div className="text-center space-y-4">
        <FaExclamationTriangle className="text-red-500 text-6xl md:text-8xl mx-auto mb-4 animate-pulse" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-red-500">
          Something Went Wrong
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400">
          An unexpected error has occurred. Please try again later.
        </p>
        <p className="text-lg md:text-xl text-gray-400">
          contact admin - enigmavssut.in
        </p>

        {/* You can optionally display the error message for debugging purposes */}
        {/* <p className="text-sm text-gray-500 mt-2">
          Details: {error.message}
        </p> */}

        <Button asChild className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-700">
          <Link href="/">
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ErrorPage;