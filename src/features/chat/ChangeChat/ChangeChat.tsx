import { IChatFeatureProps, selectChatsByType, setChatActive} from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Select } from '@/shared/ui/components';
import React from 'react';

export const ChangeChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chats = useAppSelector((state) => selectChatsByType(state, chatType))
    const activeChat = chats.find(chat => chat.isActive)

    const dispatch = useAppDispatch()
    
    return (
        <Select
            defaultOptionTitle='Выбрать чат'
            options={chats.map(({name, id}) => ({ 
                title: name, 
                value: id 
            }))}
            value={activeChat?.id}
            onChange={(e) => dispatch(setChatActive({
                id: e.target.value,
                chatType
            }))}
        />
    );
};