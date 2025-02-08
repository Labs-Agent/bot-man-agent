import { Router, Application } from 'express';
import { WorkflowController } from '../controllers/workflowController';

const router = Router();
const workflowController = new WorkflowController();

export function setWorkflowRoutes(app: Application) {
    app.use('/api/workflows', router);

    router.post('/', workflowController.createWorkflow.bind(workflowController));
    router.get('/', workflowController.getAvailableWorkflows.bind(workflowController));
    router.get('/:name', workflowController.getWorkflowByName.bind(workflowController));
    router.post('/prompt', workflowController.postPrompt.bind(workflowController));
}