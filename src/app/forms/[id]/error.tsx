"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

function ErrorPage({error} : {error:Error}) {
  useEffect(
    () => {console.error(error)}
  )

  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen w-screen">
      <span className="text-destructive text-4xl font-bold">Something went wrong 😣</span>
      <Button asChild>
        <Link href={'/'}>Go back to home page</Link>
      </Button>
    </div>
  )
}

export default ErrorPage