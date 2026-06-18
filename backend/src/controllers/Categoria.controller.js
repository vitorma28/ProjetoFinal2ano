import { HTTPError } from "../services/HTTPError";

export class CategoriaController {
    #categoriaService;

    constructor(categoriaService) {
        this.#categoriaService = categoriaService;
    }

    async create(req, res) {
        const { nome } = req.body;

        if (typeof nome !== 'string') {
            return res.status(400).json({
                message: 'Dados inválidos.'
            });
        }

        try {
            await this.#categoriaService.create(nome);

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
            await this.#categoriaService.remove(id);

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
            await this.#categoriaService.update(
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
            const categorias =
                await this.#categoriaService.getAll();

            return res.json(
                categorias.map(c => c.toJSON())
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
            const categoria =
                await this.#categoriaService.getById(id);

            return res.json(
                categoria.toJSON()
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