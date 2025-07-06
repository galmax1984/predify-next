import { getMatchdayById } from "@/app/data/matchdayData";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const matchdayNum = parseInt(resolvedParams.id, 10);
  const data = getMatchdayById(matchdayNum);
  if (!data) {
    return new Response(JSON.stringify({ error: "Matchday not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
} 