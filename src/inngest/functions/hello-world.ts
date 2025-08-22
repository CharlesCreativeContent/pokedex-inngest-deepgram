import { inngest } from "../inngest.client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world", name: 'Hello World' },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        const data = await step.invoke("get-generation",{function: getGeneration, data: event.data })
    console.log("data",data)
    console.log("newdata",data[0].message.content)
      return data[0].message.content;
    }
)

export const getGeneration = inngest.createFunction(
    { id: "get-generation", name: 'Get Generation' },
    { event: "get/generation" },
    async ({ event, step }) => {
    // This calls your model's chat endpoint, adding AI observability,
    // metrics, datasets, and monitoring to your calls.
    const pokemonName = event.data.message
    const response = await step.ai.infer("call-openai", {
      model: step.ai.models.openai({ model: "gpt-4o",
        apiKey: process.env.OPENAI_API_KEY // Only for testing
       }),
      // body is the model request, which is strongly typed depending on the model
      body: {
        messages: [{
          role: "user",
          content: `Give me a random interesting and concise fact about ${pokemonName} as if from the pokedex. In less than 40 characters.`,
        }],
      },
    });
    // The response is also strongly typed depending on the model.
    return response.choices;
  }
)