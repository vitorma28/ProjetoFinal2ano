import express from 'express';

export function categoriaRoutes(categoriaController) {
    const categoriaRoutes = express.Router();

    categoriaRoutes.post(
        '/',
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
        '/:id',
        categoriaController.update.bind(categoriaController)
    );

    categoriaRoutes.delete(
        '/:id',
        categoriaController.remove.bind(categoriaController)
    );

    return categoriaRoutes;
}