import { serve } from "inngest/next"
import { helloWorld, getGeneration } from "../../../inngest/functions/hello-world"
import { inngest } from "../../../inngest/inngest"

export const { GET, POST, PUT } = serve( { client: inngest, functions: [helloWorld, getGeneration]}  )

