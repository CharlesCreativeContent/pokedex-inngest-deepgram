// src/app/api/action/route.ts
import { NextResponse } from 'next/server';
import { inngest } from "../../../inngest/inngest"

const BASE_URL = "https://api.inngest.com" // ??  "https://pokedex-inngest-deepgram.vercel.app"

export async function POST(req: Request) {
  const { message } = await req.json();
  let runs
  const res = await inngest.send({
    name: 'test/hello.world',
    data: { message },
  });
  console.log("res: ",res)
  console.log("res.ids: ",res.ids[0])
const id = res.ids[0]

await setTimeout(async ()=>{
  runs = await triggerIngest(id);
  console.log("currentSnag",runs)

},3000)

  return NextResponse.json({ eventId: id, generation: runs });

async function triggerIngest(id: string){
return await fetch(`${BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  })
  .then(inference=>inference.json())
}
}