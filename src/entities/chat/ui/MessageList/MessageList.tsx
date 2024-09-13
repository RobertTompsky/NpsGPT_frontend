import React, { useRef } from 'react';
import { IChatFeatureProps, selectActiveChatByType } from '../../model';
import { useAppSelector, useScrollToBottom } from '@/shared/lib/hooks';
import styles from './MessageList.module.scss'
import { TextLoader } from '@/shared/ui/loaders';
import { Message } from '..';

export const MessageList: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const query = useAppSelector(state => state.chatReducer.query)
    const isAIProcessing = chat?.isAIProcessing

    const messageListRef = useRef<HTMLElement>(null)

    useScrollToBottom(messageListRef)

    const filteredMessages = chat?.messages.filter((message) => message.content
        .toLowerCase()
        .includes(query.toLowerCase())
    )

    return (
        <nav className={styles.messageList} ref={messageListRef}>
            {filteredMessages?.map((message, index) => (
                <Message
                    message={message}
                    key={index}
                />
            ))}
            {isAIProcessing && <TextLoader text='Ожидание ответа' />}
        </nav>
    );
};
