import { Router, Application } from 'express';
import { WorkflowController } from '../controllers/workflowController';
import { WorkflowModel } from '../models/workflow';
import { AgentModel } from '../models/agent';

export function setWorkflowRoutes(app: Application, workflowModel: WorkflowModel, agentModel: AgentModel) {
    const router = Router();
    const workflowController = new WorkflowController(workflowModel, agentModel);
    app.use('/api/workflows', router);

    router.post('/', workflowController.createWorkflow.bind(workflowController));
    router.get('/', workflowController.getAvailableWorkflows.bind(workflowController));
    router.get('/:name', workflowController.getWorkflowByName.bind(workflowController));
    router.delete('/:name', workflowController.removeWorkflow.bind(workflowController));
    router.post('/prompt', workflowController.postPrompt.bind(workflowController));
}
