import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js'

export function postRoutes(postController) {
    const postRoutes = express.Router();

    postRoutes.post(
        '/', authMiddleware,
        postController.create.bind(postController)
    );

    postRoutes.get(
        '/', authMiddleware,
        postController.getAll.bind(postController)
    );

    postRoutes.get(
        '/:id', authMiddleware,
        postController.getById.bind(postController)
    );

    postRoutes.patch(
        '/:id', authMiddleware,
        postController.update.bind(postController)
    );

    postRoutes.delete(
        '/:id', authMiddleware,
        postController.remove.bind(postController)
    );

    return postRoutes;
}