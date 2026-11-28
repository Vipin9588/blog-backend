import express from 'express';
import {createBlogMediaController,updateBlogMediaController,deleteMediaController} from '#/controllers/blog_media/blog_media.controller.js';

const router = express.Router();

router.post('/',createBlogMediaController);
router.patch('/update',updateBlogMediaController);
router.delete('/delete/blog/:blogId/media/:mediaId',deleteMediaController);

export default router;