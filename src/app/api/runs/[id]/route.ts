// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';

export const runtime = "nodejs"; // the SDK/API expects Node, not Edge
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // ← params is a Promise in Next 15
) {
  
  const { id } = await context.params; // ← await it

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY env var.");
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",          // pick any available text model
      input: `Give me a random interesting and concise fact about ${id} as if from the pokedex. In less than 40 characters.`,                 // your user prompt
      // instructions: "You are a concise assistant.", // optional system-style guidance
    }),
  });

  if (!res.ok) {
    // Surface useful error info
    const errTxt = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${errTxt}`);
  }

  const data = await res.json();
  // The Responses API provides a convenient aggregated string:
  return NextResponse.json(data.output[0].content[0].text);
}