import { useRef } from 'react';
import { IChatType, IMessage, selectActiveChatByType } from '../../model';
import { useAppSelector, useScrollToBottom } from '@/shared/lib/hooks';
import styles from './styles.module.scss'
import { TextLoader } from '@/shared/ui/loaders';
import { Message } from '..';

export const MessageList = ({ chatType }: { chatType: IChatType }) => {
    const chat = useAppSelector((state) => selectActiveChatByType(state, chatType))
    const messages = chat?.messages as IMessage[]
    const isAIProcessing = chat?.isAIProcessing

    const messageListRef = useRef<HTMLElement>(null)

    useScrollToBottom(messageListRef, [
        messages.length,
        messages[messages.length - 1].content
    ]);

    return (
        <nav className={styles.messageList} ref={messageListRef}>
            {messages.map((message, index) => (
                <Message
                    message={message}
                    key={index}
                />
            ))}
            {isAIProcessing && <TextLoader text='Ожидание ответа' />}
        </nav>
    );
};
