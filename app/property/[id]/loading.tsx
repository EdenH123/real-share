import { Skeleton } from "@/components/ui/Skeleton";

export default function PropertyLoading() {
  return (
    <div className="pb-2">
      {/* hero */}
      <Skeleton className="h-60 w-full rounded-none" />

      <div className="space-y-5 px-4 pt-4">
        {/* title */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-40 rounded" />
          <Skeleton className="h-7 w-64 rounded-lg" />
        </div>

        {/* key figures grid */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-card bg-surface p-3.5 shadow-card">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="mt-3 h-3 w-16 rounded" />
              <Skeleton className="mt-2 h-5 w-20 rounded" />
            </div>
          ))}
        </div>

        {/* token price card */}
        <Skeleton className="h-24 w-full rounded-card" />

        {/* the numbers */}
        <Skeleton className="h-56 w-full rounded-card" />

        {/* about */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-40 rounded" />
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-11/12 rounded" />
          <Skeleton className="h-3 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
}
