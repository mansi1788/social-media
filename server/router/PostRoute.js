import express from 'express';
import { createpost, deletePost, getPost, gettimelinePost, likePost, updatePost } from '../controller/PostController.js';
const router = express.Router()

router.post('/',createpost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put("/:id/like",likePost)
router.get("/:id/timeline",gettimelinePost)


export default router;
