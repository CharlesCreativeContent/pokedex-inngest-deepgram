# 🧠🎤 Pokedex Inngest Deepgram

This is a **Pokémon Pokédex demo app** built with **Next.js**, **Inngest**, **Deepgram**, and **OpenAI**. It demonstrates how to orchestrate an AI-powered workflow—such as transcribing audio and generating intelligent responses—using the [Inngest](https://www.inngest.com) cloud platform.

> ⚡ Run it locally to interact with the Pokédex, and observe each workflow step in real-time using Inngest’s Dev UI.

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
  - 🎙 Enter pokemon name or #ID
- 📡 The app uses:
  - Inngest to coordinate the workflow
  - OpenAI to generate responses
  - Deepgram to generate voice
- 🧪 Watch events and functions update live in the Inngest Dev UI

---

## 🚀 Deploy to Vercel

Click below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCharlesCreativeContent%2Fpokedex-inngest-deepgram&env=INNGEST_EVENT_KEY,INNGEST_SIGNING_KEY,DEEPGRAM_API_KEY,OPENAI_API_KEY&envDescription=You+will+need+API+keys+from+Inngest%2C+Deepgram%2C+and+OpenAI+to+deploy+this+project.&envLink=https%3A%2F%2Fapp.inngest.com%2Fenv%2Fproduction%2Fmanage%2Fkeys%2Chttps%3A%2F%2Fapp.inngest.com%2Fenv%2Fproduction%2Fmanage%2Fsigning-key%2Chttps%3A%2F%2Fplatform.openai.com%2Fapi-keys%2Chttps%3A%2F%2Fconsole.deepgram.com%2Flogin&project-name=pokedex-inngest-deepgram&demo-title=Pok%C3%A9dex+AI+App&demo-description=A+Pok%C3%A9dex+demo+built+with+Next.js%2C+Inngest%2C+Deepgram%2C+and+OpenAI.+Talk+or+type+to+learn+about+Pok%C3%A9mon+with+AI-powered+responses.&demo-url=https%3A%2F%2Fpokedex-inngest-deepgram.vercel.app&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2FCharlesCreativeContent%2FmyImages%2Fmain%2Fpokedex-cover.png&teamSlug=charlescreativecontents-projects&env=INNGEST_ENV%3Dproduction)


You’ll be prompted to:

- Clone the repository
- Enter your environment variables:
  - `OPENAI_API_KEY`
  - `INNGEST_EVENT_KEY`
  - `DEEPGRAM_API_KEY`

After deployment, access your live app via the Vercel-provided URL.

> In production, use the [Inngest Cloud Dashboard](https://app.inngest.com) for monitoring instead of the local Dev UI.

---

## 📚 Resources

- 📘 [Inngest Docs – Next.js Quick Start](https://www.inngest.com/docs/quickstarts/nextjs)
- 🎧 [Deepgram API Docs](https://developers.deepgram.com/)
- 🧠 [OpenAI API Docs](https://platform.openai.com/docs)
