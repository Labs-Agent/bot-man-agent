import express from "express";
import { setAgentRoutes } from "./routes/agentRoutes";
import { setWorkflowRoutes } from "./routes/workflowRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

setAgentRoutes(app);
setWorkflowRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});