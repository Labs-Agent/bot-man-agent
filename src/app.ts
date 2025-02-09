import express from "express";
import fs from "fs";
import path from "path";

import { setWorkflowRoutes } from "./routes/workflowRoutes";
import { ToolModel } from "./models/tool";
import { AgentModel } from "./models/agent";
import { WorkflowModel } from "./models/workflow";
import { AnyZodType } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { ModelConfig } from "@covalenthq/ai-agent-sdk";

const toolModel = new ToolModel();
const agentModel = new AgentModel();
const workflowModel = new WorkflowModel();

function loadTools() {
    const toolsDir = path.join(__dirname, ".", "DB", "tools");
    if (fs.existsSync(toolsDir)) {
        const files = fs.readdirSync(toolsDir);
        for (const file of files) {
            const toolPath = path.join(toolsDir, file);
            const toolRaw = fs.readFileSync(toolPath, "utf-8");
            const toolData = JSON.parse(toolRaw) as {
                id: string;
                description: string;
                schema: AnyZodType;
                execute: string;
            };
            toolModel.createTool(
                toolData.id,
                toolData.description,
                toolData.schema as AnyZodType,
                async (parameters: unknown) => {
                    const fn = new Function("parameters", toolData.execute);
                    return fn(parameters);
                }
            );
        }
    }
}

function loadAgents() {

    const agentsDir = path.join(__dirname, ".", "DB", "agents");
    if (fs.existsSync(agentsDir)) {
        const files = fs.readdirSync(agentsDir);
        for (const file of files) {
            const agentPath = path.join(agentsDir, file);
            const agentRaw = fs.readFileSync(agentPath, "utf-8");
            const agentData = JSON.parse(agentRaw) as {
                name: string;
                description: string;
                modelconfig: any;
                instructions: string[];
                tools: string[];
            };
            const toolMap: Record<string, any> = {};
            if (agentData.tools) {
                for (const t of agentData.tools) {
                    const foundTool = toolModel.getToolById(t);
                    if (!foundTool) continue;
                    toolMap[t] = foundTool.tool;
                }
            }
            let modelConfig: ModelConfig = {
                provider: 'OPEN_AI',
                name: 'gpt-4o-mini'
            };
            if (agentData.modelconfig) {
                const { provider, name } = agentData.modelconfig;
                modelConfig = {
                    provider,
                    name
                }
            }
            agentModel.createAgent(
                agentData.name,
                agentData.description,
                modelConfig,
                agentData.instructions,
                toolMap
            );
        }
    }
}


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

loadTools();
loadAgents();

process.title = "bot-man-agent";

setWorkflowRoutes(app, workflowModel, agentModel);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
