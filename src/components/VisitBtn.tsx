"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

function VisitBtn({ shareUrl }: { shareUrl: string}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button
      className="w-[150px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit <ExternalLink />
    </Button>
  );
}

export default VisitBtn;