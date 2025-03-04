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


    getAvailableWorkflows(): string[] {
        let names: string[] = [];
        this.workflows.forEach(workflow => {
            names.push(workflow.name);
        });
        return names;
    }

    getWorkflowByName(name: string): WorkflowM | undefined {
        return this.workflows.find(workflow => workflow.name === name);
    }
    removeWorkflow(name: string): boolean {
        const initialLength = this.workflows.length;
        this.workflows = this.workflows.filter(w => w.name !== name);
        return this.workflows.length < initialLength;
    }
}
