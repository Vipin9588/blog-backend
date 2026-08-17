import express from 'express';
import { updateUserController } from '#/controllers/user/update-user.controller.js';
import { deleteUserController } from '#/controllers/user/delete-user.controller.js';

const router =  express.Router();

router.post("/:id",updateUserController);
router.delete("/delete/:id",deleteUserController);

export default router;