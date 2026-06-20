import express from 'express';
import { authMiddleware } from '#middlewares/authMiddleware.js';
import { isAvaliacaoOwner } from '#middlewares/isAvaliacaoOwner.js'

export function avaliacaoRoutes(avaliacaoController, usuarioService) {
    const avaliacaoRoutes = express.Router();

    avaliacaoRoutes.post(
        '/', authMiddleware,
        avaliacaoController.create.bind(avaliacaoController)
    );

    avaliacaoRoutes.get(
        '/',
        avaliacaoController.getAll.bind(avaliacaoController)
    );

    avaliacaoRoutes.get(
        '/:id',
        avaliacaoController.getById.bind(avaliacaoController)
    );

    avaliacaoRoutes.patch(
        '/:id', authMiddleware, isAvaliacaoOwner(avaliacaoController.avaliacaoService, usuarioService),
        avaliacaoController.update.bind(avaliacaoController)
    );

    avaliacaoRoutes.delete(
        '/:id', authMiddleware, isAvaliacaoOwner(avaliacaoController.avaliacaoService, usuarioService),
        avaliacaoController.remove.bind(avaliacaoController)
    );

    return avaliacaoRoutes;
}