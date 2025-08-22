// src/inngest/inngest.ts
import 'server-only';
import { Inngest } from 'inngest';

export const inngest = new Inngest({
  id: 'pokeventure',
  // Use your env vars; these are evaluated on the server only
  eventKey: process.env.INNGEST_EVENT_KEY,
  baseUrl: process.env.INNGEST_BASE_URL, // e.g. http://localhost:8288 in dev
});