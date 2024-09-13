import React from 'react';
import { IMessage } from '../../model';
import styles from './Message.module.scss'
import { combineClassNames } from '@/shared/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IMessageUIProps {
    message: IMessage
}

export const Message: React.FC<IMessageUIProps> = ({ message }) => {

    const messageClassName = combineClassNames(
        styles.message,
        message.role === 'human'
            ? styles.sended
            : styles.received
    )

    const formattedMessageContent = message.content.split('```')

    return (
        <div className={messageClassName}>
            {formattedMessageContent.map((part, index) => {
                if (index % 2 === 0) {
                    return (
                        <ReactMarkdown key={index} className={styles.markDown}>
                            {part}
                        </ReactMarkdown>
                    )
                } else {
                    return (
                        <div key={index}>
                            <SyntaxHighlighter language='javascript' style={okaidia}>
                                {part.trim()}
                            </SyntaxHighlighter>
                        </div>
                    )
                }
            })}
        </div>
    );
};
