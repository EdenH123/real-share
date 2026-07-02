import { Skeleton } from "@/components/ui/Skeleton";

export default function InvestLoading() {
  return (
    <div className="pb-8">
      {/* header row */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-lg" />
      </div>

      <div className="space-y-4 px-4">
        {/* sim badge */}
        <Skeleton className="h-9 w-full rounded-card" />
        {/* property row */}
        <Skeleton className="h-16 w-full rounded-card" />
        {/* amount picker */}
        <div className="rounded-card bg-surface p-5 shadow-card">
          <Skeleton className="h-4 w-32 rounded" />
          <div className="mt-4 flex items-center justify-center gap-5">
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-12 w-20 rounded-lg" />
            <Skeleton className="h-11 w-11 rounded-full" />
          </div>
          <Skeleton className="mt-5 h-1.5 w-full rounded-full" />
        </div>
        {/* review */}
        <Skeleton className="h-48 w-full rounded-card" />
        {/* CTA */}
        <Skeleton className="h-14 w-full rounded-full" />
      </div>
    </div>
  );
}
