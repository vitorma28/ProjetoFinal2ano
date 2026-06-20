import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { isAdmin } from '#middlewares/isAdmin.js';

export function categoriaRoutes(categoriaController, usuarioService) {
    const categoriaRoutes = express.Router();

    categoriaRoutes.post(
        '/', authMiddleware, isAdmin(usuarioService),
        categoriaController.create.bind(categoriaController)
    );

    categoriaRoutes.get(
        '/',
        categoriaController.getAll.bind(categoriaController)
    );

    categoriaRoutes.get(
        '/:id',
        categoriaController.getById.bind(categoriaController)
    );

    categoriaRoutes.patch(
        '/:id', authMiddleware, isAdmin(usuarioService),
        categoriaController.update.bind(categoriaController)
    );

    categoriaRoutes.delete(
        '/:id', authMiddleware, isAdmin(usuarioService),
        categoriaController.remove.bind(categoriaController)
    );

    return categoriaRoutes;
}