import { getNextMatchday } from "@/app/data/matchdayData";

export async function GET() {
  const nextMatchday = getNextMatchday();
  return new Response(JSON.stringify(nextMatchday), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
} 