import { AgentModel } from "../models/agent";
import { WorkflowModel, WorkflowM } from "../models/workflow";
import { Agent } from "@covalenthq/ai-agent-sdk";

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
    public postPrompt(name: string, prompt: string): string {
        const workflow = this.workflows.getWorkflowByName(name);
        if (!workflow) {
            throw new Error('Workflow not found');
        }
        return `Prompt ${prompt} posted to workflow ${workflow.name}`;
    }
}