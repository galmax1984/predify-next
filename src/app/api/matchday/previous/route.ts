import { getPreviousMatchdays } from "@/app/data/matchdayData";

export async function GET() {
  const previousMatchdays = getPreviousMatchdays();
  return new Response(JSON.stringify(previousMatchdays), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
} 