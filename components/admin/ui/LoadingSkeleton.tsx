interface LoadingSkeletonProps {
  type?: "card" | "table" | "list";
  count?: number;
}

export default function LoadingSkeleton({ type = "card", count = 3 }: LoadingSkeletonProps) {
  const base = "animate-pulse rounded-xl bg-gray-200";

  if (type === "table") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <div className={`${base} h-10 w-10`} />
            <div className="flex-1 space-y-2">
              <div className={`${base} h-4 w-3/4`} />
              <div className={`${base} h-3 w-1/2`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className={`${base} h-4 w-1/3`} />
            <div className="mt-3 space-y-2">
              <div className={`${base} h-3 w-full`} />
              <div className={`${base} h-3 w-2/3`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className={`${base} h-4 w-24`} />
          <div className={`mt-4 ${base} h-8 w-20`} />
          <div className="mt-6 flex gap-2">
            <div className={`${base} h-10 w-10 rounded-full`} />
            <div className="flex-1 space-y-2">
              <div className={`${base} h-3 w-full`} />
              <div className={`${base} h-3 w-2/3`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
