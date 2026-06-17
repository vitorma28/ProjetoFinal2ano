import express from 'express';

export function usuarioRoutes(usuarioController) {
    const usuarioRoutes = express.Router();

    usuarioRoutes.get('/', usuarioController.getAll.bind(usuarioController));
    usuarioRoutes.get('/:id', usuarioController.getById.bind(usuarioController));

    return usuarioRoutes;
}
