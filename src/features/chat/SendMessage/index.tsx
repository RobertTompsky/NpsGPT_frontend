import { Button, Group, TextArea } from '@/shared/ui/components';
import { useState } from 'react';
import { 
    addChatMessage,
    IChatType, 
    IMessage, 
    selectActiveChatByType, 
    setChatAIProcessing 
} from '@/entities/ai/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { sendMessageThunk } from '@/entities/ai/api';
import { streamResponse } from '@/entities/ai/lib';

export const SendMessage = ({ chatType }: { chatType: IChatType }) => {
    const [content, setContent] = useState<string>('')

    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const prompt = chat?.prompt as string
    const model = useAppSelector((state) => state.chatReducer.model)

    const dispatch = useAppDispatch()

    const handleSendMessage = async () => {
        if (!content.trim()) return

        const userMessage: IMessage = {
            content,
            role: 'human'
        }

        dispatch(addChatMessage({
            chatType,
            message: userMessage
        }))
        dispatch(setChatAIProcessing({
            chatType,
            isProcessing: true
        }))

        setContent('')

        const chatHistory = chat?.messages.slice(-chat.memoryLength) as IMessage[]
        const messagesToSend = [...chatHistory, userMessage]

        dispatch(sendMessageThunk({
            messages: messagesToSend,
            prompt,
            model,
            chatId: chat?.id as string,
            type: chatType
        }))
            .unwrap()
            .then((response) => {
                if (response) {
                    streamResponse(response, dispatch, chatType)
                }
            })
    }

    return (
        <Group gap='12px' width='100%'>
            <TextArea
                placeholder='Ввести сообщение...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                    }
                }}
            />
            <Button
                children='Отправить'
                variant='approve'
                onClick={handleSendMessage}
            />
        </Group>
    );
};
