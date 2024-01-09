// apps/server/src/routes/plugin.routes.ts

import express, { Router } from 'express';
import * as pluginController from '../controllers/plugin.conroller';

const router: Router = express.Router();

router.post('/', pluginController.createPlugin);

router.get('/', pluginController.getAllApprovedPlugins);

// TODO: Add edit logic?
// router.patch('/', pluginController.updatePlugin);

export default router;
