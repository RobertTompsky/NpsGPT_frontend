import { Button, Group, TextArea } from '@/shared/ui/components';
import { useAgentStore } from '../../model';
import { MessageList } from '../MessageList';
import styles from './styles.module.scss'
import { useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const AgentInterface = () => {
    const [input, setInput] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const {
        agents,
        currentAgentId,
        deleteAgent,
        addMessage,
        streamLLMResponse,
        addSummaryPoint
    } = useAgentStore()

    const agent = agents.find(a => a.id === currentAgentId)

    const handleSendMessage = async () => {
        if (input.trim()) {
            addMessage({
                content: input,
                role: 'human'
            })
            setInput('')
            setIsProcessing(true)
            setIsDisabled(true)

            await fetchEventSource('http://localhost:3000/callAgent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input,
                    threadId: agent?.id
                } as {
                    input: string,
                    threadId: string
                }),
                onopen: async () => {
                    setIsProcessing(false)
                    addMessage({
                        content: '',
                        role: 'ai'
                    })
                },
                onmessage: (message) => {
                    switch (message.event) {
                        case 'ChatOpenAI':
                            if (message.data === '') {
                                streamLLMResponse('\n')
                            } else {
                                streamLLMResponse(message.data)
                            }
                            break
                            
                        case 'summarize_conversation':
                            addSummaryPoint(message.data)
                            break

                        default:
                            break
                    }
                },
                onclose: () => {
                    setIsDisabled(false)
                },
                onerror: (err) => {
                    setIsProcessing(false)
                    setIsDisabled(false)
                    throw err
                }
            })
        }
    }

    return (
        <>
            {agent &&
                <div className={styles.agentContainer}>
                    <div className={styles.agentHeader}>
                        {agent &&
                            <span className={styles.agentName}>
                                <strong>{agent.name}</strong>
                            </span>
                        }
                        <Button
                            children='Удалить'
                            variant='delete'
                            onClick={() => deleteAgent(agent.id as string)}
                        />
                    </div>
                    {agent.messages.length > 0 &&
                        <MessageList
                            messages={agent.messages}
                            isProcessing={isProcessing}
                        />
                    }
                    <Group width='100%' gap='10px'>
                        <TextArea
                            placeholder="Введите сообщение"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button
                            variant='approve'
                            children='Отправить'
                            onClick={handleSendMessage}
                            disabled={isDisabled}
                        />
                    </Group>
                </div>
            }
        </>
    );
};
