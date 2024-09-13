export interface IMessage {
    content: string
    role: 'human' | 'ai' | 'system'
}

export type IChatType = 'chatbot' | 'qa'

export type IChatCurrentField = 'message' | 'prompt'

export interface IChat {
    id: string
    name: string
    type: IChatType
    messages: IMessage[]
    prompt: string
    memoryLength: number
    currentField: IChatCurrentField
    isActive: boolean
    isAIProcessing: boolean
}

export interface IChatsState {
    list: IChat[]
    model: string
    query: string
}

export interface IChatFeatureProps {
    chatType: IChatType
}

export interface IChatRequestPayload {
    messages: IMessage[]
    prompt: string
    model: string
    chatId: string
}

