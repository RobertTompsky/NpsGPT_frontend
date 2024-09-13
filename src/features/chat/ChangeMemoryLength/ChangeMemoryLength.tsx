import { MEMORY_LENGTH } from '@/entities/chat/lib';
import { changeMemoryLength, IChatFeatureProps, selectActiveChatByType } from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeMemoryLength: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()

    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const memoryLength = chat?.memoryLength

    return (
        <Select
            defaultOptionTitle='Выбрать память'
            options={MEMORY_LENGTH.map(({value, title}) => ({ 
                title, 
                value 
            }))}
            value={memoryLength}
            onChange={(e) => {
                const length = Number(e.target.value)
                dispatch(changeMemoryLength({
                    chatType,
                    length
                }))
            }}
        />
    );
};