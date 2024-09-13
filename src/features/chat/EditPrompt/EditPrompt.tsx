import { Button, TextArea } from '@/shared/ui/components';
import React, { useState } from 'react';
import styles from './EditPrompt.module.scss'
import { editPrompt, IChatFeatureProps, selectActiveChatByType } from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';

export const EditPrompt: React.FC<IChatFeatureProps> = ({ chatType }) => {
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
        <div className={styles.editPrompt}>
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
                btnSize='small'
                onClick={handleEditPrompt}
                disabled={!isChanged}
            />
        </div>
    );
};
