import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js'
import { selfOrAdminMiddleware } from '#middlewares/authorizationMiddleware.js'

export function usuarioRoutes(usuarioController) {
    const router = express.Router();

    router.post(
        '/login',
        usuarioController.login.bind(usuarioController)
    );

    router.post(
        '/', authMiddleware,
        usuarioController.create.bind(usuarioController)
    );

    router.get(
        '/', authMiddleware,
        usuarioController.getAll.bind(usuarioController)
    );

    router.get(
        '/:id', authMiddleware, selfOrAdminMiddleware(usuarioController.usuarioService),
        usuarioController.getById.bind(usuarioController)
    );

    router.patch(
        '/:id', authMiddleware, selfOrAdminMiddleware(usuarioController.usuarioService),
        usuarioController.update.bind(usuarioController)
    );

    router.delete(
        '/:id', authMiddleware, selfOrAdminMiddleware(usuarioController.usuarioService),
        usuarioController.remove.bind(usuarioController)
    );

    return router;
}