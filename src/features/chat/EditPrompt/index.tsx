import { Button, Group, TextArea } from '@/shared/ui/components';
import { useState } from 'react';
import { editPrompt, IChatType, selectActiveChatByType } from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';

export const EditPrompt = ({ chatType }: { chatType: IChatType }) => {
    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const prompt = chat?.prompt
    const [text, setText] = useState<string>(prompt as string)
    const isChanged = text !== prompt

    const dispatch = useAppDispatch()

    const handleEditPrompt = () => {
        dispatch(editPrompt({
            chatType,
            prompt: text
        }))
    }
    
    return (
        <Group width='100%' gap='20px'>
            <TextArea
                placeholder='Редактировать промпт...'
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && isChanged) {
                        e.preventDefault()
                        handleEditPrompt()
                    }
                }}
            />
            <Button
                children='Сохранить промпт'
                variant='approve'
                onClick={handleEditPrompt}
                disabled={!isChanged}
            />
        </Group>
    );
};
