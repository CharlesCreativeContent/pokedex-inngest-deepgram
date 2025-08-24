# 🧠🎤 Pokedex Inngest Deepgram

This is a **Pokémon Pokédex demo app** built with **Next.js**, **Inngest**, **Deepgram**, and **OpenAI**. It demonstrates how to orchestrate an AI-powered workflow—such as transcribing audio and generating intelligent responses—using the [Inngest](https://www.inngest.com) cloud platform.

> ⚡ Run it locally to interact with the Pokédex via **voice or text**, and observe each workflow step in real-time using Inngest’s Dev UI.

---

## 📦 Local Development

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pokedex-inngest-deepgram.git
cd pokedex-inngest-deepgram
```

### 2. Install Dependencies

```bash
npm install
```

(You can also use `yarn` or `pnpm`.)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and include your API keys:

```env
OPENAI_API_KEY=<your-openai-key>
INNGEST_EVENT_KEY=<your-inngest-event-key>
DEEPGRAM_API_KEY=<your-deepgram-key>
```

You’ll need to get keys from:

- 🔑 [OpenAI](https://platform.openai.com/account/api-keys)
- 🔑 [Inngest](https://www.inngest.com/)
- 🔑 [Deepgram](https://console.deepgram.com/signup)

---

### 4. Start the Next.js Dev Server

```bash
npm run dev
```

This starts the app on [http://localhost:3000](http://localhost:3000)

---

### 5. Run the Inngest Dev Server

In a new terminal window:

```bash
npx inngest-cli@latest dev
```

This launches Inngest Dev Server (defaults to [http://localhost:8288](http://localhost:8288)).

---

### 6. Open the Inngest Dev UI

Visit [http://localhost:8288](http://localhost:8288) to monitor your events and functions.

---

### 7. Use the Pokédex App

- Open [http://localhost:3000](http://localhost:3000)
- Interact with the Pokédex:
  - 🎙 Speak a Pokémon’s name or question (uses Deepgram for voice recognition)
  - 💬 Type in a question about a Pokémon
- 📡 The app uses:
  - Deepgram to transcribe voice
  - OpenAI to generate responses
  - Inngest to coordinate the workflow
- 🧪 Watch events and functions update live in the Inngest Dev UI

---

## 🚀 Deploy to Vercel

Click below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project)

You’ll be prompted to:

- Clone the repository
- Enter your environment variables:
  - `OPENAI_API_KEY`
  - `INNGEST_EVENT_KEY`
  - `DEEPGRAM_API_KEY`

After deployment, access your live app via the Vercel-provided URL.

> In production, use the [Inngest Cloud Dashboard](https://app.inngest.com) for monitoring instead of the local Dev UI.

---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/)
- [Inngest](https://www.inngest.com)
- [Deepgram](https://www.deepgram.com)
- [OpenAI](https://platform.openai.com)

---

## 📚 Resources

- 📘 [Inngest Docs – Next.js Quick Start](https://www.inngest.com/docs/quickstarts/nextjs)
- 📘 [Inngest Event Key Setup](https://www.inngest.com/docs/send-events/event-keys)
- 🎧 [Deepgram API Docs](https://developers.deepgram.com/)
- 🧠 [OpenAI API Docs](https://platform.openai.com/docs)

---

## 🎉 Final Notes

You now have a fully functional, AI-powered Pokédex app with voice interaction and real-time function monitoring!

Feel free to:

- Customize the workflow
- Add new Inngest functions
- Tweak UI/UX

> Have fun building with AI, and **gotta catch 'em all!** 🔥🚀

