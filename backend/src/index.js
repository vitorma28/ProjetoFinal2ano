import express from 'express';
import dotenv from 'dotenv';

import { UsuarioDAO, CategoriaDAO, PostDAO, AvaliacaoDAO, ComentarioDAO } from '#daos';
import { UsuarioService, CategoriaService, PostService, AvaliacaoService, ComentarioService } from '#services';
import { UsuarioController, CategoriaController, PostController, AvaliacaoController, ComentarioController } from '#controllers';

import { usuarioRoutes, categoriaRoutes, postRoutes, avaliacaoRoutes, comentarioRoutes } from '#routes';

import { configurate } from '#config/configurate.js';

dotenv.config();

const { PORT, DBFILENAME, DEBUG } = process.env;

async function main() {
    const conn = await configurate(DBFILENAME, DEBUG);

    const app = express();
    app.use(express.json());


    // USUÁRIOS

    const usuarioDAO = new UsuarioDAO(conn);
    const usuarioService = new UsuarioService(usuarioDAO);
    const usuarioController = new UsuarioController(usuarioService);

    app.use('/usuarios', usuarioRoutes(usuarioController));


    // CATEGORIAS

    const categoriaDAO = new CategoriaDAO(conn);
    const categoriaService = new CategoriaService(categoriaDAO);
    const categoriaController = new CategoriaController(categoriaService);

    app.use('/categorias', categoriaRoutes(categoriaController, usuarioService));


    // POSTS

    const postDAO = new PostDAO(conn);
    const postService = new PostService(
        postDAO,
        usuarioDAO,
        categoriaDAO
    );
    const postController = new PostController(postService);

    app.use('/posts', postRoutes(postController, usuarioService));


    // AVALIAÇÕES

    const avaliacaoDAO = new AvaliacaoDAO(conn);
    const avaliacaoService = new AvaliacaoService(avaliacaoDAO, postDAO, usuarioDAO);
    const avaliacaoController = new AvaliacaoController(avaliacaoService);

    app.use('/avaliacoes', avaliacaoRoutes(avaliacaoController, usuarioService));


    // COMENTARIOS

    const comentarioDAO = new ComentarioDAO(conn);
    const comentarioService = new ComentarioService(comentarioDAO, postDAO, usuarioDAO);
    const comentarioController = new ComentarioController(comentarioService);

    app.use('/avaliacoes', comentarioRoutes(comentarioController, usuarioService));


    // ROOT

    app.get('/', (req, res) => {
        res.json({ message: 'Servidor executando' });
    });

    app.listen(PORT, () => {
        console.log(`Servidor sendo executado na porta ${PORT}.`);
    });
}

main();