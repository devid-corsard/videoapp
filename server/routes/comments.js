import { Router } from 'express';
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from '../controllers/comment.js';
import { verifyToken } from '../verifyToken.js';

const router = Router();
router.post('/', verifyToken, addComment);
router.put('/:id', verifyToken, editComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/:videoId', getComments);

export default router;
