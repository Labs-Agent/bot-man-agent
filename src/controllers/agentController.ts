import { Request, Response } from 'express';
import { AgentService } from '../services/agentService';
import { AgentModel } from '../models/agent';
import { ToolModel } from '../models/tool';

export class AgentController {
    private agentService: AgentService;

    constructor(agentModel: AgentModel, toolModel: ToolModel) {
        this.agentService = new AgentService(agentModel, toolModel);
    }

    public createAgent = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, modelconfig, instructions, toolnames } = req.body;
            if (!name || !description || !modelconfig || !instructions || !toolnames) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const newAgent = await this.agentService.createAgent(name, description, modelconfig, instructions, toolnames);
            res.status(201).json(newAgent);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    };

    public getAvailableAgents = async (req: Request, res: Response): Promise<void> => {
        try {
            const agents = await this.agentService.getAvailableAgents();
            res.status(200).json(agents);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    };

    public getAgentByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.params;
            if (!name) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const agent = await this.agentService.getAgentByName(name);
            res.status(200).json(agent);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
}
