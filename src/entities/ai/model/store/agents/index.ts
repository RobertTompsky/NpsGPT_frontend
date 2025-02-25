import { create } from "zustand";
import { IAgent, IMessage, IUserInfo } from "../../types";

interface AgentState {
    agents: IAgent[]
    currentAgentId: string | null
    userInfo: IUserInfo | null
    createAgent: (agent: IAgent) => void
    deleteAgent: (agentId: string) => void
    setCurrent: (agentId: string) => void
    addMessage: (message: IMessage) => void
    streamLLMResponse: (chunk: string) => void
    addSummaryPoint: (newPoint: string) => void
    setUserInfo: (info: IUserInfo) => void
}

export const useAgentStore = create<AgentState>((set) => ({
    agents: [],
    currentAgentId: null,
    userInfo: null,
    createAgent: (agent) => set(({ agents }) => ({
        agents: [...agents, agent],
        currentAgentId: agent.id
    })),
    setCurrent: (agentId) => set(() => ({
        currentAgentId: agentId
    })),
    setUserInfo: (info) => set(() => ({
        userInfo: info
    })),
    deleteAgent: (agentId) => set(({ agents }) => {
        const updatedAgents = agents.filter(agent => agent.id !== agentId);

        const newCurrentAgentId = updatedAgents.length > 0
            ? updatedAgents[0].id
            : null;

        return {
            agents: updatedAgents,
            currentAgentId: newCurrentAgentId
        };
    }),
    addMessage: (message) => set(({ agents, currentAgentId }) => {
        const updatedAgents = agents.map(agent => {
            if (agent.id === currentAgentId) {
                const updatedMessages = [...agent.messages, message]
                return {
                    ...agent,
                    messages: updatedMessages,
                    messageCount: updatedMessages.length
                }
            }
            return agent
        }
        );

        return {
            agents: updatedAgents
        };
    }),
    streamLLMResponse: (chunk) => set(({ agents, currentAgentId }) => {
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
    addSummaryPoint: (newPoint) => set(({ agents, currentAgentId }) => {
        const updatedAgents = agents.map(agent => {
            if (agent.id === currentAgentId) {
                const updatedMessageCount = agent.messageCount !== 0 ? 0 : agent.messageCount
                return {
                    ...agent,
                    summary: agent.summary.includes(newPoint)
                        ? agent.summary.map(point => point === newPoint
                            ? newPoint
                            : point
                        )
                        : [...agent.summary, newPoint],
                    messageCount: updatedMessageCount
                };
            }
            return agent;
        });

        return {
            agents: updatedAgents
        };
    })
}))