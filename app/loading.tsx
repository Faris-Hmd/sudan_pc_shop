import { Loader2 } from "lucide-react";

/**
 * Standard Next.js Loading UI.
 * This will automatically be shown by React Suspense boundaries.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* Loader2 is the standard spinning icon from Lucide */}
        <Loader2
          className="animate-spin text-blue-600"
          size={40}
          strokeWidth={2}
        />
        {/* Optional: Add a subtle pulse effect behind the loader */}
        <div className="absolute h-10 w-10 animate-ping rounded-full bg-blue-400 opacity-20"></div>
      </div>

      <p className="text-sm font-medium text-gray-500 animate-pulse">
        Loading content...
      </p>
    </div>
  );
}
