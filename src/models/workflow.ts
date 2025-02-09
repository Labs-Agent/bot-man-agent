import { Agent, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";

export interface WorkflowM {
    name: string;
    workflow: ZeeWorkflow;
}
export class WorkflowModel {
    private workflows: WorkflowM[] = [];
    createWorkflow(name: string, description: string, output: string, agents: Record<string, Agent>): WorkflowM {
        const workflow = new ZeeWorkflow({ description, output, agents });
        const workflowM: WorkflowM = {
            name,
            workflow: workflow
        };
        this.workflows.push(workflowM);
        return workflowM;
    }


    getAvailableWorkflows(): WorkflowM[] {
        return this.workflows;
    }

    getWorkflowByName(name: string): WorkflowM | undefined {
        return this.workflows.find(workflow => workflow.name === name);
    }
}
