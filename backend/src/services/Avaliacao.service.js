import { HTTPError } from './HTTPError.js';
import { Avaliacao } from '#models';

export class AvaliacaoService {
    #avaliacaoDAO;
    #postDAO;
    #usuarioDAO;

    constructor(avaliacaoDAO, postDAO, usuarioDAO) {
        this.#avaliacaoDAO = avaliacaoDAO;
        this.#postDAO = postDAO;
        this.#usuarioDAO = usuarioDAO;
    }

    async create(valor, postId, usuarioId) {
        // valida valor permitido
        if (valor !== 1 && valor !== -1) {
            throw new HTTPError(
                400,
                'Avaliação inválida. Use 1 ou -1'
            );
        }

        // valida usuário
        const user = await this.#usuarioDAO.getById(usuarioId);
        if (!user) {
            throw new HTTPError(404, 'Usuário não encontrado');
        }

        // valida post
        const post = await this.#postDAO.getById(postId);
        if (!post) {
            throw new HTTPError(404, 'Post não encontrado');
        }

        // impede múltiplos votos do mesmo usuário no mesmo post
        const avaliacoes = await this.#avaliacaoDAO.getAll();

        const existing = avaliacoes.find(
            a => a.postId === postId && a.usuarioId === usuarioId
        );

        if (existing) {
            throw new HTTPError(
                409,
                'Usuário já avaliou este post'
            );
        }

        const avaliacao = new Avaliacao(
            0,
            valor,
            postId,
            usuarioId
        );

        await this.#avaliacaoDAO.insert(avaliacao);
    }

    async getAll() {
        return await this.#avaliacaoDAO.getAll();
    }

    async getById(id) {
        const avaliacao = await this.#avaliacaoDAO.getById(id);

        if (!avaliacao) {
            throw new HTTPError(404, 'Avaliação não encontrada');
        }

        return avaliacao;
    }

    async remove(id) {
        const avaliacao = await this.#avaliacaoDAO.getById(id);

        if (!avaliacao) {
            throw new HTTPError(404, 'Avaliação não encontrada');
        }

        await this.#avaliacaoDAO.remove(id);
    }

    async update(id, changes) {
        const avaliacao = await this.#avaliacaoDAO.getById(id);

        if (!avaliacao) {
            throw new HTTPError(404, 'Avaliação não encontrada');
        }

        if ('id' in changes) {
            throw new HTTPError(400, 'Não é permitido alterar o ID');
        }

        if ('avaliacao' in changes) {
            if (changes.avaliacao !== 1 && changes.avaliacao !== -1) {
                throw new HTTPError(
                    400,
                    'Avaliação inválida. Use 1 ou -1'
                );
            }
        }

        await this.#avaliacaoDAO.update(id, changes);
    }
}