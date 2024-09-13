import { 
    createSlice, 
    PayloadAction 
} from "@reduxjs/toolkit";
import { 
    IChat, 
    IChatCurrentField, 
    IChatsState, 
    IChatType, 
    IMessage 
} from "..";
import { MODELS } from "../../lib";

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        list: [],
        model: MODELS[1].value,
        query: ''
    } as IChatsState,
    reducers: {
        createChat: (state, action: PayloadAction<IChat>) => {
            const { type } = action.payload
            const activeChat = state.list.find(
                (chat) => chat.isActive === true && chat.type === type
            )

            if (activeChat) {
                activeChat.isActive = false
            }

            state.list.push(action.payload);
        },
        removeChat: (state, action: PayloadAction<IChatType>) => {
            const chatType = action.payload;
            const chatToRemove = state.list.find(
                (chat) => chat.isActive === true && chat.type === chatType
            )

            if (chatToRemove) {
                state.list = state.list.filter((chat) => chat !== chatToRemove);
            }
        },
        setChatActive: (state, action: PayloadAction<{
            id: string,
            chatType: IChatType
        }>) => {
            const { id, chatType } = action.payload
            const activeChat = state.list.find(
                (chat) => chat.isActive === true && chat.type === chatType
            )

            if (activeChat) {
                activeChat.isActive = false
            }

            const targetChat = state.list
                .find((chat) => chat.id === id && chat.type === chatType)

            if (targetChat) {
                targetChat.isActive = true;
            }
        },
        setChatAIProcessing: (state, action: PayloadAction<{
            chatType: IChatType,
            isProcessing: boolean
        }>) => {
            const { chatType, isProcessing } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.isAIProcessing = isProcessing
            }
        },
        addChatMessage: (state, action: PayloadAction<{
            chatType: IChatType,
            message: IMessage
        }>) => {
            const { chatType, message } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                const updatedMessages = [...currentChat.messages, message]
                currentChat.messages = updatedMessages
            }
        },
        streamChatAIMessage: (state, action: PayloadAction<{
            chatType: IChatType,
            content: string
        }>) => {
            const { chatType, content } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                const lastMessageIndex = currentChat.messages.length - 1
                currentChat.messages[lastMessageIndex].content += content
            }
        },
        changeMemoryLength: (state, action: PayloadAction<{
            chatType: IChatType,
            length: number
        }>) => {
            const { chatType, length } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.memoryLength = length
            }
        },
        editPrompt: (state, action: PayloadAction<{
            chatType: IChatType,
            prompt: string
        }>) => {
            const { chatType, prompt } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.prompt = prompt
            }
        },
        changeCurrentField: (state, action: PayloadAction<{
            chatType: IChatType,
            currentField: IChatCurrentField
        }>) => {
            const { chatType, currentField } = action.payload
            const currentChat = state.list
                .find((chat) => chat.isActive === true && chat.type === chatType)

            if (currentChat) {
                currentChat.currentField = currentField
            }
        },
        changeModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload
        },
        searchMessage: (state, action: PayloadAction<string>) => {
            state.query = action.payload
        }
    }
})

export const chatReducer = chatSlice.reducer

export const {
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
} = chatSlice.actions
