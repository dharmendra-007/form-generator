"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Check, Copy } from "lucide-react";
function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />
      <Button
        className="mt-1 max-w-[250px] py-2 rounded-md cursor-pointer"
        variant={copied ? "secondary" : "default"}
        onClick={() => {
          setCopied(true)
          navigator.clipboard.writeText(shareLink);
          setTimeout(() => setCopied(false), 2000)
        }}
      >
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  );
}

export default FormLinkShare;