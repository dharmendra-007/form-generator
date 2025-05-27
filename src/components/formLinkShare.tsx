"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im"; 
function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const shareLink =`${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="max-w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
        //  toast.success("Link copied!");
        }}
      >
        <ImShare className="mr-2" /> Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;