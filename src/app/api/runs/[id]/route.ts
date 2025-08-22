// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';

const BASE_URL = process.env.VERCEL_URL 
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // ← params is a Promise in Next 15
) {
  const { id } = await context.params; // ← await it

  const upstream = await fetch(`https://${BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      ...( { 'x-inngest-env': `${process.env.INNGEST_EVENT_KEY}` }),
    },
  });
  if (!upstream.ok) {
    return NextResponse.json(
      { error: `Upstream ${upstream.status}`, body: await upstream.text() },
      { status: upstream.status }
    );
  }

  return NextResponse.json(await upstream.json());
}