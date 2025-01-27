import { createChat, IChatType } from '@/entities/chat/model';
import { Button, Group, Input } from '@/shared/ui/components';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { nanoid } from 'nanoid'

export const CreateChat = ({ chatType }: { chatType: IChatType }) => {
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
        <Group gap='4px'>
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
                children='Ок'
                onClick={handleCreateChat}
            />
        </Group>
    );
};
