// src/app/api/action/route.ts
import { NextResponse } from 'next/server';
import { inngest } from "../../../inngest/inngest"

const BASE_URL = "https://api.inngest.com" // ??  "https://pokedex-inngest-deepgram.vercel.app"

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await inngest.send({
    name: 'test/hello.world',
    data: { message },
  });
const id = res.ids[0]

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
  return NextResponse.json({ eventId: id, generation: runs });

async function triggerIngest(id: string){
return await fetch(`${BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      ...{ 'x-inngest-env': `${process.env.INNGEST_EVENT_KEY}` },
    },
  })
  .then(inference=>inference.json())
}
}