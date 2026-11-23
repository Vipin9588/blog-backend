import express from 'express';
import { createBlogController, deleteBlogController, publishBlogController,updateBlogController} from '#/controllers/blog/blog.controller.js';
const router = express.Router();

router.post('/new', createBlogController);
router.delete('/:id', deleteBlogController);
router.put('/publish', publishBlogController);
router.patch('/edit/:id',updateBlogController);

export default router;