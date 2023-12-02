// apps/server/src/routes/webhook.routes.ts

import express, { Router } from 'express';
import * as webhooksController from '../controllers/webhooks.controller';

const router: Router = express.Router();

// curl -X POST -H "Content-Type: application/json" -d '{"event": "user_signup", "userId": "12345"}' http://localhost:5000/api/webhook
router.post('/:source', webhooksController.createEvent);

export default router;
