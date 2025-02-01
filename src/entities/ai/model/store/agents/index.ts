import { create } from "zustand";
import { IAgent, IMessage } from "../../types";

interface AgentState {
    agents: IAgent[]
    currentAgentId: string | null
    createAgent: (agent: IAgent) => void
    deleteAgent: (agentId: string) => void
    setCurrent: (agentId: string) => void
    addMessage: (message: IMessage) => void
    streamLLMResponse: (chunk: string) => void
    addSummaryPoint: (newPoint: string) => void
}

export const useAgentStore = create<AgentState>((set) => ({
    agents: [],
    currentAgentId: null,
    createAgent: (agent: IAgent) => set(({ agents }) => ({
        agents: [...agents, agent],
        currentAgentId: agent.id
    })),
    setCurrent: (agentId: string) => set(() => ({
        currentAgentId: agentId
    })),
    deleteAgent: (agentId: string) => set(({ agents }) => {
        const updatedAgents = agents.filter(agent => agent.id !== agentId);

        const newCurrentAgentId = updatedAgents.length > 0
            ? updatedAgents[0].id
            : null;

        return {
            agents: updatedAgents,
            currentAgentId: newCurrentAgentId
        };
    }),
    addMessage: (message: IMessage) => set(({ agents, currentAgentId }) => {
        const updatedAgents = agents.map(agent =>
            agent.id === currentAgentId
                ? {
                    ...agent,
                    messages: [...agent.messages, message]
                }
                : agent
        );

        return {
            agents: updatedAgents
        };
    }),
    streamLLMResponse: (chunk: string) => set(({ agents, currentAgentId }) => {
        const updatedAgents = agents.map(agent => {
            if (agent.id === currentAgentId) {
                const updatedMessages = [...agent.messages];
                const lastMessage = updatedMessages[updatedMessages.length - 1];

                lastMessage.content += chunk;

                return {
                    ...agent,
                    messages: updatedMessages
                };
            }
            return agent;
        });

        return {
            agents: updatedAgents
        };
    }),
    addSummaryPoint: (newPoint: string) => set(({ agents, currentAgentId }) => {
        const updatedAgents = agents.map(agent => {
            if (agent.id === currentAgentId) {
                return {
                    ...agent,
                    summary: agent.summary.includes(newPoint)
                        ? agent.summary.map(point => point === newPoint
                            ? newPoint
                            : point
                        )
                        : [...agent.summary, newPoint]
                };
            }
            return agent;
        });

        return {
            agents: updatedAgents
        };
    })
}))