import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChatRequestPayload, setChatAIProcessing } from "../../model";

export const sendMessageThunk = createAsyncThunk(
    'chats/sendMessage',
    async (req: IChatRequestPayload, { dispatch }) => {
        const { messages, prompt, model, chatId, type } = req

        try {
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/chat/sendChatMessage`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        messages,
                        prompt,
                        model,
                        chatId,
                        type
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            return response
            
        } catch (error) {
            console.error(error)

            dispatch(setChatAIProcessing({
                chatType: 'chatbot',
                isProcessing: false
            }))
        }
    }
)