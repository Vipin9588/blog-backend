import express from 'express';
import { createUserController } from '#/controllers/auth/new-user.controllers.js';
import { loginUserController } from '#/controllers/auth/user-login.controller.js';
import { logout } from '#/controllers/auth/logout-user.controller.js';
import {googleLoginController} from '#/controllers/auth/google-login.js';

const router = express.Router();

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.post('/google-login',googleLoginController);
router.post('/logout',logout);

export default router; 