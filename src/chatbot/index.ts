import { ChatbotClient } from "../../lib/ChatbotClient";
import { GetChatbotReplyResult, ResponseError } from "../../lib/ChatbotClient/messages";

const client = new ChatbotClient();
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const lsUrl = `${wsProtocol}://${window.location.hostname}:${1616}`;

declare global {
    interface Window { Planet9Chatbot: { id: string, title: string, subTitle: string, component: React.Component, changeChatbot: () => void; close: () => void, open: () => void } }
}

window.Planet9Chatbot.changeChatbot = async function() {
    await changeChatbot(window.Planet9Chatbot.id);
    this.component.updateChatbotData();
}

window.Planet9Chatbot.close = async () => {
    await client.close();
    const rootDiv = document.getElementById('chatbot-root');
    if (rootDiv) {
        rootDiv.style.visibility = "hidden";
    }
}

window.Planet9Chatbot.open = async () => {
    const rootDiv = document.getElementById('chatbot-root');
    if (rootDiv) {
        rootDiv.style.visibility = "";
    }
}

(async () => {
    try {

        const config = await  fetch(`/api/functions/SystemSettings/Start`, {
            method: 'POST', 
            headers: {
                    "Content-Type": "application/json"
            }
        });
        console.log(await config.json());

        await client.connect(lsUrl);

        // @ts-ignore
        client.on("disconnected", async (closeEvent) => {
            if (closeEvent.wasClean) return;
            await new Promise(r => setTimeout(r, 1000));
            const result = await client.connect(lsUrl);
            if (result.success) {
                await client.initialize(window.Planet9Chatbot.id);
                console.log('Chatbot reconnected');
            }
        });

        await client.initialize(window.Planet9Chatbot.id);
        console.log("Client initialized");
    } catch (e) {
        console.log("Error: ", e);
    }
})();

async function changeChatbot(id: string) {
    if (!client.isConnected) {
        await client.connect(lsUrl);
    }
    await client.initialize(id);
}

export async function getChatbotReply(message: string): Promise<GetChatbotReplyResult> {
    try {
        const response = await client.getChatbotReply(message);
        return response.result;
    } catch (e) {
        throw e;
    }
}