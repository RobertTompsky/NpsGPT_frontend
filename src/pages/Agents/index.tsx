import { useAgentStore } from "@/entities/ai/model";
import { AgentInterface, Summary } from "@/entities/ai/ui";
import { Group, Input, Button, Select } from "@/shared/ui/components";
import { PageWrapper, Container } from "@/shared/ui/layout";
import { useState } from "react";
import { nanoid } from 'nanoid'

export const Agents = () => {
    const [agentName, setAgentName] = useState('')
    const { agents, currentAgentId, createAgent, setCurrent } = useAgentStore()
    const agent = agents.find(a => a.id === currentAgentId)

    const handleCreateAgent = () => {
        if (!agentName.trim()) return

        createAgent({
            id: nanoid(),
            name: agentName,
            messages: [],
            summary: []
        })
        setAgentName('')
    }

    return (
        <PageWrapper>
            <Container gap='24px'>
                <Group width='45%' gap='18px'>
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
                        <Select
                            value={agent?.id}
                            options={agents.map(({ id, name }) => ({ value: id, title: name }))}
                            defaultOptionTitle='Выбрать агента'
                            onChange={(e) => setCurrent(e.target.value)}
                        />
                    }
                </Group>
                <Group gap='18px'>
                    <AgentInterface />
                    {agent && <Summary />}
                </Group>
            </Container>
        </PageWrapper>
    );
};
