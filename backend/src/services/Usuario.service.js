export class UsuarioService {
        #dao = null;

        constructor(dao) {
                this.#dao = dao;
        }

        async criarUsuario() {}
}