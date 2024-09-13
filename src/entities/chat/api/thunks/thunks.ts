import { createAsyncThunk } from "@reduxjs/toolkit";
import { IChatRequestPayload, setChatAIProcessing } from "../../model";

export const sendMessageThunk = createAsyncThunk(
    'chats/sendMessage',
    async (req: IChatRequestPayload, { dispatch }) => {
        const { messages, prompt, model, chatId } = req

        try {
            const response = await fetch(
                'http://127.0.0.1:3000/chat/sendChatMessage',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        messages,
                        prompt,
                        model,
                        chatId
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