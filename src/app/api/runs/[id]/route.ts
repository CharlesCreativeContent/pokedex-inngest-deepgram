// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';

export const runtime = "nodejs"; // the SDK/API expects Node, not Edge
const BASE_URL = "https://api.inngest.com"
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // ← params is a Promise in Next 15
) {
  const { id } = await context.params; // ← await it

  const upstream = await fetch(`https://${BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      ...( { 'x-inngest-env': `${process.env.INNGEST_EVENT_KEY}` }),
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  })
  .then(inference=>inference.json())
  .then(done=>{
  const answer = done.data[0].output[0].message.content
  return answer
})

  return NextResponse.json(upstream);
}