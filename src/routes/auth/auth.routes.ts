import express from 'express';
import { createUserController } from '../../controllers/user/new-user.controllers.js';
import { loginUserController } from '../../controllers/user/user-login.controller.js';

const router = express.Router();

router.post('/register',createUserController);
router.post('/login',loginUserController);
