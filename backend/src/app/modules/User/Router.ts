import { Router } from 'express';
import { UserService } from './UserService';

const router = Router();
const userService = new UserService();

router.get('/', async (request, response) => {
    try {
        const users = await userService.getAll();
        return response.status(200).send(users);
    } catch (error) {
        return response.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});

router.post('/', async (request, response) => {
    try {
        const user = await userService.createUser(request.body);
        return response.status(201).send(user);
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        await userService.deleteUser(id);
        return response.status(200).send();
    } catch (error: any) {
        return response.status(400).json({ message: error.message });
    }
});

export default router;