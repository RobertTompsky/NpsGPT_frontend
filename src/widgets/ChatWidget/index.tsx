import { IChatType, selectChatsByType } from '@/entities/ai/model';
import { MessageList } from '@/entities/ai/ui';
import {
    ChangeChat,
    ChangeCurrentField,
    ChangeMemoryLength,
    ChangeModel,
    CreateChat,
    EditPrompt,
    RemoveChat,
    SendMessage
} from '@/features/chat';
import { useAppSelector } from '@/shared/lib/hooks';
import React from 'react';
import styles from './styles.module.scss'
import { Group } from '@/shared/ui/components';

export const ChatWidget = ({ chatType }: { chatType: IChatType }) => {
    const chats = useAppSelector((state) => selectChatsByType(state, chatType))
    const activeChat = chats.find(chat => chat.isActive === true)
    const hasMessages = activeChat?.messages && activeChat.messages.length > 0
    const hasChats = chats.length > 0
    const field = activeChat?.currentField

    return (
        <div className={styles.chatWidget}>
            <section className={styles.chatWidget__managementPanel}>
                <Group gap='20px'>
                    <CreateChat chatType={chatType} />
                    {hasChats &&
                        <React.Fragment>
                            <ChangeChat chatType={chatType} />
                            <ChangeModel />
                        </React.Fragment>
                    }
                </Group>
                {hasChats && <RemoveChat chatType={chatType} />}
            </section>
            {hasChats &&
                <section className={styles.chatWidget__currentChat}>
                    {hasMessages &&
                        <MessageList
                            messages={activeChat.messages}
                            isProcessing={activeChat.isAIProcessing}
                        />
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
