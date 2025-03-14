import express from 'express';
import { deleteUser, followUser, getUser,UnfollowUser,updateUser,getAllUsers } from '../controller/UserController.js';
import authMiddleWare from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/',getAllUsers)
router.get('/:id',getUser)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare,deleteUser)
router.put('/:id/follow',authMiddleWare,followUser)
router.put('/:id/unfollow',authMiddleWare,UnfollowUser)

export default router