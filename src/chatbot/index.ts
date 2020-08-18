import {ChatbotClient} from "../../lib/ChatbotClient";

const client = new ChatbotClient();
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const lsUrl = `${wsProtocol}://${window.location.hostname}:${1616}`;

(async () => {
    try {
        await client.connect(lsUrl);
        await client.initialize("planet9-demo");
        console.log("Client initialized");
    } catch (e) {
        console.log("Error: ", e);
    }
})();

export async function getResponse(message: string): Promise<string> {
    try {
        const response = await client.getChatbotReply(message);
        if (typeof response.result.answer === "string") {
            return response.result.answer;
        } else {
            return "I have no answer for that";
        }        
    } catch (e) {
        return `Error: ${e.message}`;
    }
}