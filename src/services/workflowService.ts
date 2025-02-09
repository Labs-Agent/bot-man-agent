import { Agent, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { AgentModel } from "../models/agent";
import { WorkflowModel, WorkflowM } from "../models/workflow";
import fs from "fs";
import path from "path";

export class WorkflowService {
    private workflows: WorkflowModel;
    private agents: AgentModel;

    constructor(workflowModel: WorkflowModel, agentModel: AgentModel) {
        this.workflows = workflowModel;
        this.agents = agentModel;
    }
    public createWorkflow(name: string): WorkflowM {
        console.log('Creating workflow', name);
        const workflowpath = path.join(__dirname, "..", "DB", "workflows", name + ".json");
        if (!fs.existsSync(workflowpath)) {
            throw new Error('Workflow not found');
        }
        const workflowRaw = fs.readFileSync(workflowpath, "utf-8");
        const workflowData = JSON.parse(workflowRaw) as {
            description: string;
            output: string;
            agents: string[];
        };
        const agents =
            workflowData.agents.reduce((acc: Record<string, Agent>, agentName: string) => {
                console.log('agentName', agentName);
                console.log('this.agents', this.agents);
                const agentM = this.agents.findAgentByName(agentName);
                console.log('agentM', agentM);
                if (agentM) {
                    acc[agentName] = agentM.agent;
                }
                return acc;
            }, {});
        console.log('agents', agents);
        const workflow = this.workflows.createWorkflow(name, workflowData.description, workflowData.output, agents);
        return workflow;

    }

    public getAvailableWorkflows(): WorkflowM[] {
        return this.workflows.getAvailableWorkflows();
    }

    public getWorkflowByName(workflowname: string): WorkflowM | undefined {
        return this.workflows.getWorkflowByName(workflowname);
    }

    public removeWorkflow(name: string): boolean {
        return this.workflows.removeWorkflow(name);
    }
    public async postPrompt(name: string, prompt: string): Promise<string> {
        const workflow = this.workflows.getWorkflowByName(name);
        console.log('workflow', workflow);
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
