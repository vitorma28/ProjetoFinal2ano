import { HTTPError } from "../services/HTTPError.js";

export class PostController {
    #postService;

    constructor(postService) {
        this.#postService = postService;
    }

    async create(req, res) {
        const {
            titulo,
            conteudo,
            fotoApresentacao,
            categoriaId,
            usuarioId
        } = req.body;

        try {
            await this.#postService.create(
                titulo,
                conteudo,
                fotoApresentacao,
                categoriaId,
                usuarioId
            );

            return res.sendStatus(201);
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            console.error(err);

            return res.status(500).json({
                message: 'Erro interno do servidor.'
            });
        }
    }

    async remove(req, res) {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID inválido.'
            });
        }

        try {
            await this.#postService.remove(id);

            return res.sendStatus(204);
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            console.error(err);

            return res.status(500).json({
                message: 'Erro interno do servidor.'
            });
        }
    }

    async update(req, res) {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID inválido.'
            });
        }

        const changes = req.body;

        if (
            changes === null ||
            typeof changes !== 'object' ||
            Array.isArray(changes)
        ) {
            return res.status(400).json({
                message: 'Alterações inválidas.'
            });
        }

        try {
            await this.#postService.update(
                id,
                changes
            );

            return res.sendStatus(204);
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            console.error(err);

            return res.status(500).json({
                message: 'Erro interno do servidor.'
            });
        }
    }

    async getAll(req, res) {
        try {
            const posts =
                await this.#postService.getAll();

            return res.json(
                posts.map(p => p.toJSON())
            );
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({
                message: 'Erro interno do servidor.'
            });
        }
    }

    async getById(req, res) {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID inválido.'
            });
        }

        try {
            const post =
                await this.#postService.getById(id);

            return res.json(
                post.toJSON()
            );
        }
        catch (err) {
            if (err instanceof HTTPError) {
                return res.status(err.code).json({
                    message: err.message
                });
            }

            console.error(err);

            return res.status(500).json({
                message: 'Erro interno do servidor.'
            });
        }
    }
}