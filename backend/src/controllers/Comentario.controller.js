import { HTTPError } from '../services/HTTPError.js';

export class ComentarioController {
    #comentarioService;

    constructor(comentarioService) {
        this.#comentarioService = comentarioService;
    }

    async create(req, res) {
        const usuarioId = req.user.id;
        const postId = Number(req.params.postId);
        const { conteudo } = req.body;

        try {
            await this.#comentarioService.create(
                conteudo,
                postId,
                usuarioId
            );

            return res.status(201).json({
                message: 'Comentário criado com sucesso'
            });
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            console.error(err);

            return res.status(500).json({
                message: 'Erro interno no servidor'
            });
        }
    }

    async getAll(req, res) {
        try {
            const comentarios = await this.#comentarioService.getAll();

            return res.json(comentarios);
        }
        catch (err) {
            return res.status(500).json({
                message: 'Erro interno no servidor'
            });
        }
    }

    async getById(req, res) {
        const id = Number(req.params.id);

        try {
            const comentario = await this.#comentarioService.getById(id);

            return res.json(comentario);
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            return res.status(500).json({
                message: 'Erro interno no servidor'
            });
        }
    }

    async update(req, res) {
        const id = Number(req.params.id);
        const changes = req.body;

        try {
            await this.#comentarioService.update(id, changes);

            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            return res.status(500).json({
                message: 'Erro interno no servidor'
            });
        }
    }

    async remove(req, res) {
        const id = Number(req.params.id);

        try {
            await this.#comentarioService.remove(id);

            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            return res.status(500).json({
                message: 'Erro interno no servidor'
            });
        }
    }
}