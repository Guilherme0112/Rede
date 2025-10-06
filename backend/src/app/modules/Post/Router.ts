import { Router } from 'express';
import { PostService } from './PostService';

const router = Router();
const postService = new PostService();

router.get('/', async(request, response) => {
    try {
        const posts = await postService.getAll();
        return response.status(200).send(posts);
    } catch (error: any) {
        return response.status(500).json({ error: error.message });
    }
});

router.post('/', async(request, response) => {
    try {
        const post = await postService.createPost(request.body);
        return response.status(201).send(post);
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async(request, response) => {
    try {
        const { id } = request.params;
        await postService.deletePost(id);
        return response.status(200).send();
    } catch (error: any) {
        return response.status(400).json({ error: error.message });
    }
});

export default router;