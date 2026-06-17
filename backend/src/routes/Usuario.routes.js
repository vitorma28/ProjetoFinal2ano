import express from 'express';

const UsuarioRoutes = express.Router();

UsuarioRoutes.get('/');
UsuarioRoutes.get('/:id');

export { UsuarioRoutes };
