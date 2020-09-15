import {ChatbotClient} from "../../lib/ChatbotClient";
import {GetChatbotReplyResult, ResponseError} from "../../lib/ChatbotClient/messages";

const client = new ChatbotClient();
const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const lsUrl = `${wsProtocol}://${window.location.hostname}:${1616}`;

declare global {
    interface Window { ChatbotData: {id: string, title: string, subTitle: string, changeChatbot: (id: string) => void; close: () => void}}
}

window.ChatbotData =  window.ChatbotData ? window.ChatbotData : {
    id: "795B6EA9-06EE-EA11-9452-7085C23EF572",
    changeChatbot: null,
    close: null,
    title: "Title",
    subTitle: "Sub Title",
};

window.ChatbotData.changeChatbot = async (id: string) => {
    console.log("Change chatbot called");
    window.ChatbotData.id = id;

    const rootDiv = document.getElementById('chatbot-root');
    if (rootDiv) {
        rootDiv.style.visibility = "";
    }    

    if (!client.isConnected) {
        await client.connect(lsUrl);
    }
    await client.initialize(id);
}

window.ChatbotData.close = async () => {

    await client.close();
    const rootDiv = document.getElementById('chatbot-root');
    if (rootDiv) {
        rootDiv.style.visibility = "hidden";
    }
}

(async () => {
    try {
        await client.connect(lsUrl);

        // @ts-ignore
        client.on("disconnected", async (closeEvent) => {
            if (closeEvent.wasClean) return;            
            await new Promise(r => setTimeout(r, 1000));
            const result = await client.connect(lsUrl);
            if (result.success) {
                await client.initialize(window.ChatbotData.id);
                console.log('Chatbot reconnected');
            }
        });

        await client.initialize(window.ChatbotData.id);
        console.log("Client initialized");
    } catch (e) {
        console.log("Error: ", e);
    }
})();

export async function getChatbotReply(message: string): Promise<GetChatbotReplyResult> {
    try {
        const response = await client.getChatbotReply(message);
        return response.result;
    } catch (e) {
        throw e;
    }
}