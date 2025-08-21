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
    let pokemonName = event.data.message
    console.log("env", !!process.env.OPENAI_API_KEY)
    const response = await step.ai.infer("call-openai", {
      model: step.ai.models.openai({ model: "gpt-4o",
        apiKey: "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" // Only for testing
       }),
      // body is the model request, which is strongly typed depending on the model
      body: {
        messages: [{
          role: "user",
          content: `Give me a random interesting and concise fact about ${pokemonName} as if from the pokedex. In less than 50 characters.`,
        }],
      },
    });

    // The response is also strongly typed depending on the model.
    return response.choices;
    
  }


)
