import { HTTPError } from './HTTPError.js';
import { Comentario } from '#models';

export class ComentarioService {
    #comentarioDAO;
    #postDAO;
    #usuarioDAO;

    constructor(comentarioDAO, postDAO, usuarioDAO) {
        this.#comentarioDAO = comentarioDAO;
        this.#postDAO = postDAO;
        this.#usuarioDAO = usuarioDAO;
    }

    async create(conteudo, postId, usuarioId) {
        if (!conteudo || conteudo.trim().length === 0) {
            throw new HTTPError(400, 'Comentário não pode ser vazio');
        }

        const user = await this.#usuarioDAO.getById(usuarioId);
        if (!user) {
            throw new HTTPError(404, 'Usuário não encontrado');
        }

        const post = await this.#postDAO.getById(postId);
        if (!post) {
            throw new HTTPError(404, 'Post não encontrado');
        }

        const comentario = new Comentario(
            0,
            conteudo,
            postId,
            usuarioId
        );

        await this.#comentarioDAO.insert(comentario);
    }

    async getAll() {
        return await this.#comentarioDAO.getAll();
    }

    async getById(id) {
        const comentario = await this.#comentarioDAO.getById(id);

        if (!comentario) {
            throw new HTTPError(404, 'Comentário não encontrado');
        }

        return comentario;
    }

    async update(id, changes) {
        const comentario = await this.#comentarioDAO.getById(id);

        if (!comentario) {
            throw new HTTPError(404, 'Comentário não encontrado');
        }

        if ('id' in changes) {
            throw new HTTPError(400, 'Não é permitido alterar o ID');
        }

        if ('conteudo' in changes) {
            if (!changes.conteudo || changes.conteudo.trim().length === 0) {
                throw new HTTPError(400, 'Comentário não pode ser vazio');
            }
        }

        await this.#comentarioDAO.update(id, changes);
    }

    async remove(id) {
        const comentario = await this.#comentarioDAO.getById(id);

        if (!comentario) {
            throw new HTTPError(404, 'Comentário não encontrado');
        }

        await this.#comentarioDAO.remove(id);
    }
}