// src/app/api/action/route.ts
import { NextResponse } from 'next/server';
import { inngest } from "../../../inngest/inngest.client"

export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await inngest.send({
    name: 'test/hello.world',
    data: { message },
  });

  return NextResponse.json({ eventId: res.ids[0] });
}