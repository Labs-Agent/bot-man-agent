import { Router, Application } from 'express';
import { ToolController } from '../controllers/toolController';
import { ToolModel } from '../models/tool';

export function setToolRoutes(app: Application, toolModel: ToolModel) {
    const router = Router();
    const toolController = new ToolController(toolModel);
    app.use('/api/tools', router);

    router.post('/', toolController.createTool.bind(toolController));
    router.get('/', toolController.getAvailableTools.bind(toolController));
    router.post('/:id', toolController.getToolById.bind(toolController));
}
