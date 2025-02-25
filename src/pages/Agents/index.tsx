import { useAgentStore } from "@/entities/ai/model";
import { AgentInterface, Summary, UserInfo } from "@/entities/ai/ui";
import { Group, Input, Button, Select } from "@/shared/ui/components";
import { PageWrapper, Container } from "@/shared/ui/layout";
import { useState } from "react";
import { nanoid } from 'nanoid'

export const Agents = () => {
    const [agentName, setAgentName] = useState('')
    const [sideBar, setSideBar] = useState('summary')
    const { agents, currentAgentId, createAgent, setCurrent } = useAgentStore()
    const agent = agents.find(a => a.id === currentAgentId)

    const handleCreateAgent = () => {
        if (!agentName.trim()) return

        createAgent({
            id: nanoid(),
            name: agentName,
            messages: [],
            messageCount: 0,
            summary: []
        })
        setAgentName('')
    }

    return (
        <PageWrapper>
            <Container gap='24px'>
                <Group width='100%' gap='18px' justifyContent="space-between">
                    <Group gap='4px'>
                        <Input
                            placeholder='Имя агента...'
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                        />
                        <Button
                            children='Создать'
                            onClick={handleCreateAgent}
                        />
                    </Group>
                    {agents.length > 0 &&
                        <Group justifyContent='space-between' width='75%'>
                            <Select
                                value={agent?.id}
                                options={agents.map(({ id, name }) => ({ value: id, title: name }))}
                                defaultOptionTitle='Выбрать агента'
                                onChange={(e) => setCurrent(e.target.value)}
                            />
                            <Select
                                value={sideBar}
                                options={[{
                                    value: 'summary',
                                    title: 'Сводка'
                                },{
                                    value: 'userInfo',
                                    title: 'Профиль'
                                }].map(({ value, title }) => ({ value, title }))}
                                defaultOptionTitle='Выбрать блок'
                                onChange={(e) => setSideBar(e.target.value)}
                            />
                        </Group>
                    }
                </Group>
                <Group gap='18px' alignItems="flex-start">
                    <AgentInterface />
                    {agent && ( sideBar === 'summary' ? <Summary /> : <UserInfo />)}
                </Group>
            </Container>
        </PageWrapper>
    );
};
