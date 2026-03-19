async function simulateError(searchParams: { simulate?: string } | undefined) {
  if (searchParams?.simulate === "error") {
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
    <div>
      <h1>Error Page Trigger Route for Testing Error Boundary</h1>
    </div>
  );
}
