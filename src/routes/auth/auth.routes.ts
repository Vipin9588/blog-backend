import express from 'express';
import { createUserController } from '#/controllers/user/new-user.controllers.js';
import { loginUserController } from '#/controllers/user/user-login.controller.js';
import { logout } from '#/controllers/user/logout-user.controller.js';

const router = express.Router();

router.post('/register',createUserController);
router.post('/login',loginUserController);
router.post('/logout',logout);

export default router;