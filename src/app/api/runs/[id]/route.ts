// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';

export const runtime = "nodejs"; // the SDK/API expects Node, not Edge
const BASE_URL = "https://pokedex-inngest-deepgram.vercel.app" // ??  "https://api.inngest.com"
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // ← params is a Promise in Next 15
) {
  const { id } = await context.params; // ← await it

  const upstream = await fetch(`${BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      ...( { 'x-inngest-env': `${process.env.INNGEST_EVENT_KEY}` }),
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  })
  .then(inference=>NextResponse.json(inference))
    console.log("done: ",upstream)
  
  return upstream
}