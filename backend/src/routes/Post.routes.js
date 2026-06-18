import express from 'express';

export function postRoutes(postController) {
    const postRoutes = express.Router();

    postRoutes.post(
        '/',
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
        '/:id',
        postController.update.bind(postController)
    );

    postRoutes.delete(
        '/:id',
        postController.remove.bind(postController)
    );

    return postRoutes;
}