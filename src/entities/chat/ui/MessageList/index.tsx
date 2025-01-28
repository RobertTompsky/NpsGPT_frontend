import { useRef } from 'react';
import { IMessage } from '../../model';
import { useScrollToBottom } from '@/shared/lib/hooks';
import styles from './styles.module.scss'
import { TextLoader } from '@/shared/ui/loaders';
import { Message } from '..';

export const MessageList = ({ 
    messages, 
    isProcessing = true
}: { 
    messages: IMessage[], 
    isProcessing: boolean 
}) => {
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
            {isProcessing && <TextLoader text='Ожидание ответа' />}
        </nav>
    );
};
