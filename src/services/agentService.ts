import { ModelConfig, Tool } from "@covalenthq/ai-agent-sdk";
import { AgentModel, AgentM } from "../models/agent";
import { ToolModel } from "../models/tool";

export class AgentService {
    private agents: AgentModel;
    private tools: ToolModel;

    constructor(agentModel: AgentModel, toolModel: ToolModel) {
        this.agents = agentModel;
        this.tools = toolModel;
    }

    createAgent(name: string, description: string, modelconfig: JSON, instrucions: string[], toolnames: string[]): AgentM {
        const toolMap: Record<string, Tool> = {};
        for (const toolname of toolnames) {
            const tool = this.tools.getToolById(toolname);
            if (!tool) {
                throw new Error(`Tool ${toolname} not found`);
            }
            toolMap[toolname] = tool.tool;
        }

        const modelConfig: ModelConfig = modelconfig as unknown as ModelConfig;
        return this.agents.createAgent(name, description, modelConfig, instrucions, toolMap);
    }

    getAvailableAgents(): AgentM[] {
        return this.agents.getAvailableAgents();
    }
    getAgentByName(name: string): AgentM | undefined {
        return this.agents.findAgentByName(name);
    }

}
