import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { isComentarioOwner } from '#middlewares/isComentarioOwner.js';

export function comentarioRoutes(comentarioController, usuarioService) {
    const comentarioRoutes = express.Router();

    comentarioRoutes.post(
        '/', authMiddleware,
        comentarioController.create.bind(comentarioController)
    );

    comentarioRoutes.get(
        '/',
        comentarioController.getAll.bind(comentarioController)
    );

    comentarioRoutes.get(
        '/:id',
        comentarioController.getById.bind(comentarioController)
    );

    comentarioRoutes.patch(
        '/:id', authMiddleware, isComentarioOwner(comentarioController.comentarioService, usuarioService),
        comentarioController.update.bind(comentarioController)
    );

    comentarioRoutes.delete(
        '/:id', authMiddleware, isComentarioOwner(comentarioController.comentarioService, usuarioService),
        comentarioController.remove.bind(comentarioController)
    );

    return comentarioRoutes;
}