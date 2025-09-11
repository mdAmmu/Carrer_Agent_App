import { Inngest } from "inngest";

export const inngest = new Inngest({id: "carrer-agent-app",
    eventKey: process.env.INNGEST_EVENT_KEY!,
});