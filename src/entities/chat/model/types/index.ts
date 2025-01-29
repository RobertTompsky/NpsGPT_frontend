export interface IMessage {
    content: string
    role: 'human' | 'ai' | 'system'
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

