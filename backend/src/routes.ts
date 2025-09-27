import { Router } from 'express';
import PostsRouter from '@src/app/modules/Post/Router';

class Routes {
    static define(router: Router): Router {
        router.use('/posts', PostsRouter);
        return router;
    }
}

export default Routes.define(Router());