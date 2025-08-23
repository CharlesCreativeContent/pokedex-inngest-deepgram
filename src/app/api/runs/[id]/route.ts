// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';
export const runtime = "nodejs";

export async function GET( _req: Request, 
  context: { params: Promise<{ id: string }> }
){
  const { id } = await context.params;
  
// Could not get to work in production

// const BASE_URL = "https://api.inngest.com" // ??  "https://pokedex-inngest-deepgram.vercel.app"
// async function triggerIngest(id: string){
// return await fetch(`${BASE_URL}/v1/events/${id}/runs`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
//     },
//   }).then(inference=>inference.json())
// }

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY env var.");

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: `Give me a random interesting and concise fact about ${id} as if from the pokedex. In less than 40 characters.`,
    }),
  });

  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${errTxt}`);}
  const data = await res.json();
  return NextResponse.json(data.output[0].content[0].text);
}