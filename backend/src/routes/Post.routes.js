import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js'
import { isPostOwner } from '#middlewares/isPostOwner.js';

export function postRoutes(postController, usuarioService) {
    const postRoutes = express.Router();

    postRoutes.post(
        '/', authMiddleware,
        postController.create.bind(postController)
    );

    postRoutes.get(
        '/',
        postController.getAll.bind(postController)
    );

    postRoutes.get(
        '/:id',
        postController.getById.bind(postController)
    );

    postRoutes.patch(
        '/:id', authMiddleware, isPostOwner(postController.postService, usuarioService),
        postController.update.bind(postController)
    );

    postRoutes.delete(
        '/:id', authMiddleware, isPostOwner(postController.postService, usuarioService),
        postController.remove.bind(postController)
    );

    return postRoutes;
}