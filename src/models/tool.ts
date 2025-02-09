import { Tool, createTool } from '@covalenthq/ai-agent-sdk';
import { AnyZodType } from '@covalenthq/ai-agent-sdk/dist/core/base';

export interface ToolM {
    name: string;
    tool: Tool;
}

export class ToolModel {
    private tools: ToolM[] = [];

    createTool(name: string, description: string, schema: AnyZodType, execute: (parameters: unknown) => Promise<string>): ToolM {
        const newTool = createTool({
            id: name,
            description,
            schema,
            execute
        }
        )
        const toolM: ToolM = { name, tool: newTool };
        this.tools.push(toolM);
        return toolM;
    }

    getAvailableTools(): ToolM[] {
        return this.tools;
    }

    getToolById(name: string): ToolM | undefined {
        return this.tools.find(tool => tool.name === name);
    }
}