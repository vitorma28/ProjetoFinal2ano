import bcryptjs from 'bcryptjs';
import { GenericDAO } from "#daos";
import { Usuario } from "#models";
import { HTTPError } from './HTTPError.js';


function verifyExtension(...classes) {
        for (const c of classes) {
                if (!(c instanceof GenericDAO))
                        throw new TypeError('DAO inserido não é decendente de GenericDAO.');
        }
}

export class PostService {
    #postDAO;
    #usuarioDAO;
    #categoriaDAO;

    constructor(
        postDAO,
        usuarioDAO,
        categoriaDAO
    ) {
        verifyExtension(postDAO, usuarioDAO, categoriaDAO);

        this.#postDAO = postDAO;
        this.#usuarioDAO = usuarioDAO;
        this.#categoriaDAO = categoriaDAO;
    }

    async create(
        titulo,
        conteudo,
        fotoApresentacao,
        categoriaId,
        usuarioId
    ) {
        const usuario =
            await this.#usuarioDAO.getById(usuarioId);

        if (!usuario) {
            throw new HTTPError(
                404,
                `Usuário com ID ${usuarioId} não existe.`
            );
        }

        const categoria =
            await this.#categoriaDAO.getById(categoriaId);

        if (!categoria) {
            throw new HTTPError(
                404,
                `Categoria com ID ${categoriaId} não existe.`
            );
        }

        const post = new Post(
            0,
            titulo,
            conteudo,
            fotoApresentacao,
            categoriaId,
            usuarioId
        );

        await this.#postDAO.insert(post);
    }

    async remove(id) {
        const post =
            await this.#postDAO.getById(id);

        if (!post) {
            throw new HTTPError(
                404,
                `Post com ID ${id} não existe.`
            );
        }

        await this.#postDAO.remove(id);
    }

    async update(id, changes) {
        const post =
            await this.#postDAO.getById(id);

        if (!post) {
            throw new HTTPError(
                404,
                `Post com ID ${id} não existe.`
            );
        }

        if (
            'id' in changes ||
            !this.#areValidChanges(changes)
        ) {
            throw new HTTPError(
                400,
                `Alteração não permitida para post de ID ${id}.`
            );
        }

        if ('usuarioId' in changes) {
            const usuario =
                await this.#usuarioDAO.getById(
                    changes.usuarioId
                );

            if (!usuario) {
                throw new HTTPError(
                    404,
                    `Usuário com ID ${changes.usuarioId} não existe.`
                );
            }
        }

        if ('categoriaId' in changes) {
            const categoria =
                await this.#categoriaDAO.getById(
                    changes.categoriaId
                );

            if (!categoria) {
                throw new HTTPError(
                    404,
                    `Categoria com ID ${changes.categoriaId} não existe.`
                );
            }
        }

        await this.#postDAO.update(
            id,
            changes
        );
    }

    #areValidChanges(changes) {
        const keys = Object.keys(changes);

        for (const k of keys) {
            if (
                !Post
                    .columnsToInsert()
                    .includes(k)
            ) {
                return false;
            }
        }

        return true;
    }

    async getAll() {
        return await this.#postDAO.getAll();
    }

    async getById(id) {
        const post =
            await this.#postDAO.getById(id);

        if (!post) {
            throw new HTTPError(
                404,
                `Post com ID ${id} não existe.`
            );
        }

        return post;
    }
}