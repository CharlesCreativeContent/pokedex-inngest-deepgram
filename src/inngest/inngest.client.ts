import { Inngest } from "inngest";


// Create a client to send and reviece events new
export const inngest = new Inngest({id:"Basic Inngest Application",  fetch: fetch.bind(globalThis), })