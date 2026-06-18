import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js'

export function categoriaRoutes(categoriaController) {
    const categoriaRoutes = express.Router();

    categoriaRoutes.post(
        '/', authMiddleware,
        categoriaController.create.bind(categoriaController)
    );

    categoriaRoutes.get(
        '/', authMiddleware,
        categoriaController.getAll.bind(categoriaController)
    );

    categoriaRoutes.get(
        '/:id', authMiddleware,
        categoriaController.getById.bind(categoriaController)
    );

    categoriaRoutes.patch(
        '/:id', authMiddleware,
        categoriaController.update.bind(categoriaController)
    );

    categoriaRoutes.delete(
        '/:id', authMiddleware,
        categoriaController.remove.bind(categoriaController)
    );

    return categoriaRoutes;
}