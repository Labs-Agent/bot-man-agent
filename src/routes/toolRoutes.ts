import { Router, Application } from 'express';
import { ToolController } from '../controllers/toolController';

const router = Router();
const toolController = new ToolController();

export function setToolRoutes(app: Application) {
    router.post('/', toolController.createTool.bind(toolController));
    router.get('/', toolController.getAvailableTools.bind(toolController));
    router.post('/:id', toolController.getToolById.bind(toolController));
}