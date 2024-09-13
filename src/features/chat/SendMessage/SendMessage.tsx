import { Button, TextArea } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './SendMessage.module.scss'
import { addChatMessage, IChatFeatureProps, IMessage, selectActiveChatByType, setChatAIProcessing } from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { sendMessageThunk } from '@/entities/chat/api';
import { streamResponse } from '@/entities/chat/lib';

export const SendMessage: React.FC<IChatFeatureProps> = ({ chatType }) => {
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

        switch (chatType) {
            case 'chatbot':
                dispatch(sendMessageThunk({
                    messages: messagesToSend,
                    prompt,
                    model,
                    chatId: chat?.id as string
                }))
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            streamResponse(response, dispatch, 'chatbot')
                        }
                    })

                break
            case 'qa':
                break
        }
    }

    return (
        <div className={styles.sendMessage}>
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
                btnSize='small'
                onClick={handleSendMessage}
            />
        </div>
    );
};
