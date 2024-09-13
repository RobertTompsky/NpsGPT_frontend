import { IChatFeatureProps, selectChatsByType } from '@/entities/chat/model';
import { MessageList } from '@/entities/chat/ui';
import { ChangeChat, ChangeCurrentField, ChangeMemoryLength, ChangeModel, CreateChat, EditPrompt, RemoveChat, SearchMessage, SendMessage } from '@/features/chat';
import { useAppSelector } from '@/shared/lib/hooks';
import React from 'react';
import styles from './ChatWidget.module.scss'
import { combineClassNames } from '@/shared/lib/utils';

export const ChatWidget: React.FC<IChatFeatureProps> = ({ chatType }) => {
    const chats = useAppSelector((state) => selectChatsByType(state, chatType))
    const activeChat = chats.find(chat => chat.isActive === true)
    const hasMessages = activeChat?.messages && activeChat.messages.length > 0
    const hasChats = chats.length > 0
    const field = activeChat?.currentField

    const chatWidgetClassName = combineClassNames(
        styles.chatWidget,
        styles[chatType]
    )

    return (
        <div className={chatWidgetClassName}>
            <section className={styles.chatWidget__managementPanel}>
                <div className={styles.group}>
                    <CreateChat chatType={chatType} />
                    {hasChats &&
                        <React.Fragment>
                            <ChangeChat chatType={chatType} />
                            <ChangeModel />
                        </React.Fragment>
                    }
                </div>
                {hasChats &&
                    <div className={styles.group}>
                        <SearchMessage />
                        <RemoveChat chatType={chatType} />
                    </div>
                }
            </section>
            {hasChats &&
                <section className={styles.chatWidget__currentChat}>
                    {hasMessages &&
                        <MessageList chatType={chatType} />
                    }
                    <div className={styles.chatWidget__currentChat_interactionPanel}>
                        <div className={styles.chatWidget__currentChat_settings}>
                            <ChangeCurrentField chatType={chatType} />
                            <ChangeMemoryLength chatType={chatType} />
                        </div>
                        {
                            field === 'message'
                                ? <SendMessage chatType={chatType} />
                                : <EditPrompt chatType={chatType} />
                        }
                    </div>
                </section>
            }
        </div>
    );
};
