import { MODELS } from '@/entities/chat/lib';
import { changeModel } from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeModel: React.FC = () => {
    const model = useAppSelector(state => state.chatReducer.model)
    const dispatch = useAppDispatch()

    return (
        <Select
            defaultOptionTitle='Выбрать модель'
            options={MODELS.map(({title, value}) => ({ 
                title, 
                value 
            }))}
            value={model}
            onChange={(e) => dispatch(changeModel(e.target.value))}
        />
    );
};