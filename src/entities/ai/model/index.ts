export { useAgentStore } from './store/agents'

export { 
    selectChatsByType, 
    selectActiveChatByType 
} from './selectors'

export type { 
    IChat, 
    IChatType, 
    IMessage,
    IChatRequestPayload,
    IAgent,
    IUserInfo
} from './types'

export { 
    chatReducer, 
    createChat,
    removeChat,
    setChatActive,
    searchMessage,
    setChatAIProcessing,
    streamChatAIMessage,
    changeCurrentField,
    changeMemoryLength,
    changeModel,
    addChatMessage,
    editPrompt 
} from './slices'




