import { Request, Response } from 'express';
import { WorkflowService } from '../services/workflowService';
import { WorkflowModel } from '../models/workflow';
import { AgentModel } from '../models/agent';

export class WorkflowController {
    private workflowService: WorkflowService;

    constructor(workflowModel: WorkflowModel, agentModel: AgentModel) {
        this.workflowService = new WorkflowService(workflowModel, agentModel);
    }

    public async createWorkflow(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, output, agents } = req.body;
            if (!name || !description || !output || !agents) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const newWorkflow = await this.workflowService.createWorkflow(name, description, output, agents);
            res.status(201).json(newWorkflow);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    public async getAvailableWorkflows(req: Request, res: Response): Promise<void> {
        try {
            const workflows = await this.workflowService.getAvailableWorkflows();
            res.status(200).json(workflows);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
    public async getWorkflowByName(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            if (!name) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const workflow = await this.workflowService.getWorkflowByName(name);
            res.status(200).json(workflow);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
    public async postPrompt(req: Request, res: Response): Promise<void> {
        try {
            const { workflowname, prompt } = req.body;
            if (!workflowname || !prompt) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const response = await this.workflowService.postPrompt(workflowname, prompt);
            res.status(200).json(response);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
}
