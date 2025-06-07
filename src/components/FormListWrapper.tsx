import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FormList from "./FormList";

function FormCardSkeleton() {
  return (
    <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />
  );
}

export default function FormListWrapper() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        </div>
      }
    >
      <FormList />
    </Suspense>
  );
}

