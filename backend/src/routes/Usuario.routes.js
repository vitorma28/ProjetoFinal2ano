import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js'
import { isUsuarioOwner } from '#middlewares/isUsuarioOwner.js'

export function usuarioRoutes(usuarioController) {
    const router = express.Router();

    router.post(
        '/login',
        usuarioController.login.bind(usuarioController)
    );

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
        '/:id', authMiddleware, isUsuarioOwner(usuarioController.usuarioService),
        usuarioController.update.bind(usuarioController)
    );

    router.delete(
        '/:id', authMiddleware, isUsuarioOwner(usuarioController.usuarioService),
        usuarioController.remove.bind(usuarioController)
    );

    return router;
}