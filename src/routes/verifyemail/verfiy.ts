import express from 'express';
import { verifyEmailController } from '#/controllers/verify-email/verify-email.controller.js';
import {verifyEmailSentController} from '#/controllers/verify-email/verify-email.controller.js';
 const  router = express.Router();
router.post('/verify', verifyEmailController);
router.get('/verification', verifyEmailSentController);

export default router;
