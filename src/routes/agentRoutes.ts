import { Router, Application } from 'express';
import { AgentController } from '../controllers/agentController';
import { AgentModel } from '../models/agent';
import { ToolModel } from '../models/tool';


export function setAgentRoutes(app: Application, agentModel: AgentModel, toolModel: ToolModel) {
    const agentController = new AgentController(agentModel, toolModel);
    const router = Router();
    app.use('/api/agents', router);

    router.post('/', agentController.createAgent.bind(agentController));
    router.get('/', agentController.getAvailableAgents.bind(agentController));
    router.get('/:name', agentController.getAgentByName.bind(agentController));
}