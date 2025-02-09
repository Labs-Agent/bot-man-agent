import express from "express";
import { setAgentRoutes } from "./routes/agentRoutes";
import { setWorkflowRoutes } from "./routes/workflowRoutes";
import { setToolRoutes } from "./routes/toolRoutes";

import { ToolModel } from "./models/tool";
import { AgentModel } from "./models/agent";
import { WorkflowModel } from "./models/workflow";

const toolModel = new ToolModel();
const agentModel = new AgentModel();
const workflowModel = new WorkflowModel();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setToolRoutes(app, toolModel);
setAgentRoutes(app, agentModel, toolModel);
setWorkflowRoutes(app, workflowModel, agentModel);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});