import { inngest } from "../inngest";

export const helloWorld = inngest.createFunction(
    { id: "hello-world", name: 'Hello World' },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        const data = await step.invoke("get-generation",{function: getGeneration, data: event.data })
      return data[0].message.content;
    }
)

export const getGeneration = inngest.createFunction(
    { id: "get-generation", name: 'Get Generation' },
    { event: "get/generation" },
    async ({ event, step }) => {
    const pokemonName = event.data.message
    const response = await step.ai.infer("call-openai", {
      model: step.ai.models.openai({ model: "gpt-4o",
        apiKey: process.env.OPENAI_API_KEY
       }),
      body: {
        messages: [{
          role: "user",
          content: `Give me a random interesting and concise fact about ${pokemonName} as if from the pokedex. In less than 40 characters.`,
        }],
      },
    });
    return response.choices;
  }
)