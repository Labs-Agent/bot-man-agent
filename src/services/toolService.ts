import { ToolModel, ToolM } from '../models/tool';

export class ToolService {
    private tools: ToolModel;
    constructor(toolModel: ToolModel) {
        this.tools = toolModel;
    }
    createTool(name: string, description: string, schema: any, execute: string): ToolM {
        const executeFn = new Function('parameters', execute) as (parameters: unknown) => Promise<string>;
        const zodSchema = typeof schema === 'string' ? JSON.parse(schema) : schema;
        return this.tools.createTool(name, description, zodSchema, executeFn);
    }

    getAvailableTools(): ToolM[] {
        return this.tools.getAvailableTools();
    }
    getToolById(toolId: string): ToolM | undefined {
        return this.tools.getToolById(toolId);
    }
}