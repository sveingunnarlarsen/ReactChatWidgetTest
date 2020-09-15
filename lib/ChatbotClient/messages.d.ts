export interface Message {
    jsonrpc: string;
}
export interface NotificationMessage<Params = any> extends Message {
    method: string;
    params?: Params;
}
export interface RequestMessage<Params = any> extends Message {
    id: number | string;
    method: string;
    params?: Params;
}
export interface ResponseMessage<Result = any> extends Message {
    id: number | string | null;
    /**
     * The result of a request. This can be omitted in
     * the case of an error.
     */
    result?: Result;
    error?: ResponseError;
}
export declare type Document = string;
/******************************** */
/******************************** */
export interface TerminateParams extends BaseParams {
}
/******************************** */
/******************************** */
export interface BaseParams {
    chatbotId: string;
}
export interface InitializeParams extends BaseParams {
}
export interface GetChatbotReplyParams extends BaseParams {
    message: string;
}
/************************* */
/************************* */
export interface ResponseError<D = any> {
    code: number;
    message: string;
    /**
     * A Primitive or Structured value that contains additional
     * information about the error. Can be omitted.
     */
    data?: D;
}
export declare type InitializeResult = null;
export declare type GetChatbotReplyResult = {
    id: string;
    group: string;
    type: 'text' | 'link';
    delay: number;
    active: boolean;
    text: string;
}[];
