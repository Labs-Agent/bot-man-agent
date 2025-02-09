import { Agent, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { AgentModel } from "../models/agent";
import { WorkflowModel, WorkflowM } from "../models/workflow";

export class WorkflowService {
    private workflows: WorkflowModel;
    private agents: AgentModel;

    constructor(workflowModel: WorkflowModel, agentModel: AgentModel) {
        this.workflows = workflowModel;
        this.agents = agentModel;
    }
    public createWorkflow(name: string, description: string, output: string, agentnames: string[]): WorkflowM {
        const agents = agentnames.reduce((acc, agentname) => {
            const agent = this.agents.findAgentByName(agentname);
            if (!agent) {
                throw new Error('Agent not found');
            }
            acc[agentname] = agent.agent;
            return acc;
        }, {} as Record<string, Agent>);
        const newWorkflow = this.workflows.createWorkflow(name, description, output, agents);
        return newWorkflow;
    }

    public getAvailableWorkflows(): WorkflowM[] {
        return this.workflows.getAvailableWorkflows();
    }
    public getWorkflowByName(workflowname: string): WorkflowM | undefined {
        return this.workflows.getWorkflowByName(workflowname);
    }
    public async postPrompt(name: string, prompt: string): Promise<string> {
        const workflow = this.workflows.getWorkflowByName(name);
        if (!workflow) {
            throw new Error('Workflow not found');
        }

        const initialState = StateFn.root(workflow.workflow.description);
        initialState.messages.push(
            user(prompt)
        )
        const result = await ZeeWorkflow.run(workflow.workflow, initialState);
        const lastMessage = result.messages[result.messages.length - 1];
        return typeof lastMessage.content === 'string' ? lastMessage.content : JSON.stringify(lastMessage.content);
    }
}
