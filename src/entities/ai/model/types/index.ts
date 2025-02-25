export interface IMessage {
    content: string
    role: 'human' | 'ai'
}

export type IChatType = 'chatbot' | 'qa'

export interface IChat {
    id: string
    name: string
    type: IChatType
    messages: IMessage[]
    prompt: string
    memoryLength: number
    currentField: 'message' | 'prompt'
    isActive: boolean
    isAIProcessing: boolean
}

export interface IChatRequestPayload {
    type: IChatType
    messages: IMessage[]
    prompt: string
    model: string
    chatId: string
}

export interface IAgent {
    id: string
    name: string
    messages: IMessage[]
    messageCount: number
    summary: string[]
}

export interface IUserInfo {
    name: string;
    gender: string;
    interests: string[];
    chatPreferences: string[];
}
