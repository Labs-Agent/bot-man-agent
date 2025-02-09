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
            const { name } = req.body;
            const workflow = await this.workflowService.createWorkflow(name);
            const url = { url: "http://localhost:3000/api/workflows/prompt" }
            res.status(201).json(url);
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
    public async removeWorkflow(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.params;
            if (!name) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const result = await this.workflowService.removeWorkflow(name);
            res.status(200).json({ message: result ? 'Workflow removed' : 'Workflow not found' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
    public async postPrompt(req: Request, res: Response): Promise<void> {
        try {
            const { name, prompt } = req.body;
            if (!name || !prompt) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const response = await this.workflowService.postPrompt(name, prompt);
            res.status(200).json(response);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
}
