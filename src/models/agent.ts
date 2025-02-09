import { Agent, ModelConfig, Tool } from '@covalenthq/ai-agent-sdk';
import { ToolModel } from './tool';
export interface AgentM {
    name: string;
    agent: Agent;
}
export class AgentModel {
    private agents: AgentM[] = [];
    createAgent(name: string, description: string, model: ModelConfig, instructions: string[], tools: Record<string, Tool>): AgentM {

        const newAgent = new Agent({
            name,
            description,
            model,
            instructions,
            tools
        });
        const agentM: AgentM = { name, agent: newAgent };
        this.agents.push(agentM);
        return agentM;
    }

    getAvailableAgents(): AgentM[] {
        return this.agents;
    }

    findAgentByName(name: string): AgentM | undefined {
        return this.agents.find(agent => agent.name === name);
    }
}