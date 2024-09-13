import { IChatFeatureProps, removeChat, selectChatsByType, setChatActive } from '@/entities/chat/model';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/components';
import React from 'react';

export const RemoveChat: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const dispatch = useAppDispatch()

    const chats = useAppSelector((state) => selectChatsByType(state, chatType))
    const activeChat = chats.find(chat => chat.isActive === true)

    const handleRemoveChat = () => {
        const activeChatIndex = chats.findIndex(chat => chat === activeChat)
        const previousChat = chats[activeChatIndex - 1]
        const nextChat = chats[activeChatIndex + 1]
        const chatToSetActive = previousChat || nextChat

        dispatch(removeChat(chatType))

        if (chatToSetActive) {
            dispatch(setChatActive({
                id: chatToSetActive.id,
                chatType
            }))
        }
    }
    
    return (
        <Button
            variant='delete'
            btnSize='small'
            children='Удалить чат'
            onClick={handleRemoveChat}
        />
    );
};
