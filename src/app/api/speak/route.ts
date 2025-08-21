export async function POST(req: Request) {
  const { text } = await req.json();

  const upstream = await fetch(
    "https://api.deepgram.com/v1/speak?model=aura-2-thalia-en",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Deepgram expects "Token <API_KEY>"
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY!}`,
        // Optional but nice to be explicit:
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!upstream.ok) {
    const err = await upstream.text();
    return new Response(err || "Upstream error", { status: upstream.status });
  }

  const audio = await upstream.arrayBuffer();
  return new Response(audio, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}