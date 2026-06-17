export class UsuarioController {
    #usuarioService;

    constructor(usuarioService) {
        this.#usuarioService = usuarioService;
    }

    async getAll(req, res) {
        const users = this.#usuarioService.getAll();

        return res.json(users);
    }

    async getById(req, res) {
        const { idStr } = req.params;
        const id = parseInt(idStr);

        const usuario = this.#usuarioService.getById(id);

        if (!usuario) {
            return res.status(404).json({
                message: `Usuario de id ${idStr} não existe.`
            });
        }

        return res.json(usuario);
    }
}
