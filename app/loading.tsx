import Loading from "@/components/Loading";

/**
 * Standard Next.js Loading UI.
 * This will automatically be shown by React Suspense boundaries.
 */
export default function LoadingPage() {
  return (
    <Loading fullScreen={false} size="lg" text="Loading Sudan PC Shop..." />
  );
}
