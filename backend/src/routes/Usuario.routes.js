import express from 'express';

export function usuarioRoutes(usuarioController) {
    const router = express.Router();

    router.post(
        '/',
        usuarioController.create.bind(usuarioController)
    );

    router.get(
        '/',
        usuarioController.getAll.bind(usuarioController)
    );

    router.get(
        '/:id',
        usuarioController.getById.bind(usuarioController)
    );

    router.patch(
        '/:id',
        usuarioController.update.bind(usuarioController)
    );

    router.delete(
        '/:id',
        usuarioController.remove.bind(usuarioController)
    );

    return router;
}