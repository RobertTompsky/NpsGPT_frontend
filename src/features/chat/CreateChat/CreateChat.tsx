import { createChat, IChatFeatureProps } from '@/entities/chat/model';
import { Button, Input } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './CreateChat.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks';
import { nanoid } from 'nanoid'

export const CreateChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const [chatName, setChatName] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleCreateChat = () => {
        if (!chatName.trim()) return

        dispatch(createChat({
            id: nanoid(),
            name: chatName,
            type: chatType,
            messages: [],
            memoryLength: 2,
            prompt: '',
            isActive: true,
            isAIProcessing: false,
            currentField: 'message'
        }))
        setChatName('')
    }
    return (
        <div className={styles.createChat}>
            <Input
                placeholder={
                    chatType === 'chatbot'
                        ? 'Создать чат...'
                        : 'Создать qa-чат...'
                }
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); 
                        handleCreateChat()
                    }
                }}
            />
            <Button
                variant='approve'
                btnSize='small'
                children='Ок'
                onClick={handleCreateChat}
            />
        </div>
    );
};
