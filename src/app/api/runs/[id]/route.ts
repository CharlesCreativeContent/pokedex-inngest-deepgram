// src/app/api/runs/[id]/route.ts
import { NextResponse } from 'next/server';

const INNGEST_BASE_URL =
  process.env.INNGEST_BASE_URL ?? 'http://localhost:8288';
const INNGEST_AUTH =
  process.env.INNGEST_SIGNING_KEY ?? process.env.INNGEST_EVENT_KEY ?? '';
const INNGEST_ENV = process.env.INNGEST_ENV ?? '';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // ← params is a Promise in Next 15
) {
  const { id } = await context.params; // ← await it

  const upstream = await fetch(`${INNGEST_BASE_URL}/v1/events/${id}/runs`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${INNGEST_AUTH}`,
      ...(INNGEST_ENV ? { 'x-inngest-env': INNGEST_ENV } : {}),
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