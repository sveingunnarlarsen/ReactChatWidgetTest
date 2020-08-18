import * as protocol from './messages';
export declare enum ClientEvent {
    Connected = "connected",
    Disconnected = "disconnected",
    Reconnected = "reconnected",
    Errd = "errd"
}
export interface ConnectResult {
    success: boolean;
    error?: any;
}
export declare class ChatbotClient {
    private _msgCounter;
    private _socket;
    private _chatbotId;
    private _eventEmitter;
    private _cookie;
    private _responseQueue;
    private _chatbotReady;
    constructor();
    /**
     * Send a request to the chatbot-server
     * @param method What type of action the chatbot-server should perform
     * @param params Associated parameters to the method
     *
     */
    private _execute;
    on(event: ClientEvent.Connected, listener: () => void): void;
    on(event: ClientEvent.Disconnected, listener: (event: {
        code: number;
        reason: string;
        wasClean: boolean;
    }) => void): void;
    on(event: ClientEvent.Reconnected, listener: () => void): void;
    on(event: ClientEvent.Errd, listener: (error: protocol.ResponseError) => void): void;
    /**
     * Set the authorization cookie to be used to authenticate.
     * @param cookie The cookie to use
     */
    setCookie(cookie: string): void;
    /**
     * Check if the client is connected to a server
     *
     */
    readonly isConnected: boolean;
    /**
     * Connect to a remote chatbot-server
     * @param uri The websocket uri to connect to, eg 'wss://localhost:1339'
     */
    connect(uri: string, cookie?: string): Promise<ConnectResult>;
    close(): Promise<void>;
    initialize(chatbotId?: string): Promise<protocol.ResponseMessage<protocol.InitializeResult>>;
    getChatbotReply(message: string): Promise<protocol.ResponseMessage<protocol.GetChatbotReplyResult>>;
}
