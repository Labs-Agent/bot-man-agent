import { Router, Application } from 'express';
import { AgentController } from '../controllers/agentController';

const router = Router();
const agentController = new AgentController();

export function setAgentRoutes(app: Application) {
    app.use('/api/agents', router);

    router.post('/', agentController.createAgent.bind(agentController));
    router.get('/', agentController.getAvailableAgents.bind(agentController));
    router.get('/:name', agentController.getAgentByName.bind(agentController));
    router.post('/prompt', agentController.postPrompt.bind(agentController));

}