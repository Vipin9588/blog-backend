import express from 'express';
import { createUserController } from '#/controllers/auth/new-user.controllers.js';
import { loginUserController } from '#/controllers/auth/user-login.controller.js';
import { logout } from '#/controllers/auth/logout-user.controller.js';

const router = express.Router();

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.post('/logout',logout);

export default router; 