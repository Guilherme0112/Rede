import { Router } from 'express';
import { CommentService } from './CommentService';

const router = Router();
const commentService = new CommentService();

router.get('/', async(request, response) => {
    const comments = await commentService.getAll();
    return response.json(comments);
});

export default router;