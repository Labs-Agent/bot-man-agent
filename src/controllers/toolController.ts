import { Request, Response } from 'express';
import { ToolService } from '../services/toolService';
import { ToolModel } from '../models/tool';

export class ToolController {
    private toolService: ToolService;

    constructor(toolModel: ToolModel) {
        this.toolService = new ToolService(toolModel);
    }

    public async createTool(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, schema, execute } = req.body;
            const newTool = await this.toolService.createTool(name, description, schema, execute);
            res.status(201).json(newTool);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }

    public async getAvailableTools(req: Request, res: Response): Promise<void> {
        try {
            const tools = await this.toolService.getAvailableTools();
            res.status(200).json(tools);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
    public async getToolById(req: Request, res: Response): Promise<void> {
        try {
            const { toolId } = req.params;
            const tool = await this.toolService.getToolById(toolId);
            res.status(200).json(tool);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    }
}
