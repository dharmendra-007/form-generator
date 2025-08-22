import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import { Skeleton } from "@/components/ui/skeleton"; 
import clsx from "clsx";

interface StatsCardProps {
  title: string;
  value: string;
  helperText: string;
  className?: string;
  loading: boolean;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={clsx(className)}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? <Skeleton className="h-6 w-24" /> : value}
        </div>
        <div className="text-muted-foreground text-sm mt-1">
          {helperText}
        </div>
      </CardContent>
    </Card>
  );
}
