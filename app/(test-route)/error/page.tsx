import { Button } from "@/app/components/ui/button";
import Link from "next/link";

async function simulateError(searchParams: { simulate?: string } | undefined) {
  if (process.env.NODE_ENV === "development" && searchParams?.simulate === "error") {
    throw new Error(
      "Simulated error: Unable to fetch posts. The database server may be unreachable or the connection pool has been exhausted."
    );
  }
}

export default async function ErrorPageTrigger({
  searchParams,
}: {
  searchParams: Promise<{ simulate?: string }>;
}) {
  const params = await searchParams;
  await simulateError(params);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-sage-900 text-sage-100">
      <h1 className="text-2xl font-bold">Error Page Trigger Route for Testing Error Boundary</h1>
      <p className="text-sm text-sage-300">
        Add query param ?simulate=error to the URL to trigger an error.
      </p>
      <Link href="/" className="text-sm text-sage-300">
        <Button variant="outline" className="mt-4 cursor-pointer">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
