import { HTTPError } from "../services/HTTPError.js";

export class UsuarioController {
    #usuarioService;

    constructor(usuarioService) {
        this.#usuarioService = usuarioService;
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
            await this.#usuarioService.update(
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

    async create(req, res) {
        const {
            nome,
            senha,
            tipo
        } = req.body;

        if (
            typeof nome !== 'string' ||
            typeof senha !== 'string' ||
            typeof tipo !== 'string'
        ) {
            return res.status(400).json({
                message: 'Dados inválidos.'
            });
        }

        try {
            await this.#usuarioService.create(
                nome,
                senha,
                tipo
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
            await this.#usuarioService.remove(id);

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
        const users = await this.#usuarioService.getAll();
        
        return res.json(users.map(u => u.toJSON('senhaHash')));
    }

    async getById(req, res) {
        const id = parseInt(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: 'ID inválido.'
            });
        }

        try {
            const usuario = await this.#usuarioService.getById(id);

            return res.json(usuario.toJSON('senhaHash'));
        }
        catch (err) {
            if (!(err instanceof HTTPError)) {
                return res.status(500).json({
                    message: 'Erro interno do servidor.'
                });
            }

            console.error(err);

            return res.status(err.code).json({ message: err.message });
        }
    }
}
