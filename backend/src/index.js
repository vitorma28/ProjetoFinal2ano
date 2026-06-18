import express from 'express';
import dotenv from 'dotenv';

import { UsuarioDAO, CategoriaDAO, PostDAO } from '#daos';
import { UsuarioService, CategoriaService, PostService } from '#services';
import { UsuarioController, CategoriaController, PostController } from '#controllers';

import { usuarioRoutes, categoriaRoutes, postRoutes } from '#routes';

import { configurate } from '#config/configurate.js';

dotenv.config();

const { PORT, DBFILENAME, DEBUG } = process.env;

async function main() {
    const conn = await configurate(DBFILENAME, DEBUG);

    const app = express();
    app.use(express.json());

    // =========================
    // USUÁRIOS
    // =========================
    const usuarioDAO = new UsuarioDAO(conn);
    const usuarioService = new UsuarioService(usuarioDAO);
    const usuarioController = new UsuarioController(usuarioService);

    app.use('/usuarios', usuarioRoutes(usuarioController));

    // =========================
    // CATEGORIAS
    // =========================
    const categoriaDAO = new CategoriaDAO(conn);
    const categoriaService = new CategoriaService(categoriaDAO);
    const categoriaController = new CategoriaController(categoriaService);

    app.use('/categorias', categoriaRoutes(categoriaController));

    // =========================
    // POSTS
    // =========================
    const postDAO = new PostDAO(conn);
    const postService = new PostService(
        postDAO,
        usuarioDAO,
        categoriaDAO
    );
    const postController = new PostController(postService);

    app.use('/posts', postRoutes(postController));

    // =========================
    // ROOT
    // =========================
    app.get('/', (req, res) => {
        res.json({ message: 'Servidor executando' });
    });

    app.listen(PORT, () => {
        console.log(`Servidor sendo executado na porta ${PORT}.`);
    });
}

main();