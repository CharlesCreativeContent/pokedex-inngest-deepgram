// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';

export const runtime = "nodejs"; // the SDK/API expects Node, not Edge
const BASE_URL = "https://api.inngest.com" // ??  "https://pokedex-inngest-deepgram.vercel.app"
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // ← params is a Promise in Next 15
) {
  const { id } = await context.params; // ← await it

  let runs = await triggerIngest(id);
  console.log("currentSnag",runs)
  while (runs[0].status !== "Completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    runs = await triggerIngest(id);
    console.log("finalSnag",runs)

    if (runs[0].status === "Failed" || runs[0].status === "Cancelled") {
      throw new Error(`Function run ${runs[0].status}`);
    }
  }
  return NextResponse.json(runs[0]);

async function triggerIngest(id: string){
return await fetch(`${BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.INNGEST_EVENT_KEY}`,
    },
  })
  .then(inference=>inference.json())
}
}