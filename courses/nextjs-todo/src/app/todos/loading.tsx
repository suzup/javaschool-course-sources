export default function TodosLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
            <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
          </li>
        ))}
      </ul>
    </div>
  );
}
