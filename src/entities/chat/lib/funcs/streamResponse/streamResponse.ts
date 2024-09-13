import { addChatMessage, IChatType, setChatAIProcessing, streamChatAIMessage } from "@/entities/chat/model";
import { getStreamDecoder } from "@/shared/lib/utils";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

export const streamResponse = async (
    response: Response,
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    chatType: IChatType
) => {
    const { reader, decoder } = getStreamDecoder(response)

    dispatch(setChatAIProcessing({
        chatType,
        isProcessing: false
    }))
    dispatch(addChatMessage({
        chatType,
        message: {
            role: 'ai',
            content: ''
        }
    }))

    while (true) {
        const { value, done } = await reader.read()
        const chunk = decoder.decode(value, { stream: true })

        dispatch(streamChatAIMessage({
            chatType,
            content: chunk
        }))

        if (done) break
    }

}