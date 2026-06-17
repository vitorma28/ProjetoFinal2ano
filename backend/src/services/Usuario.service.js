import { GenericDAO } from "#daos";


function verifyExtension(...classes) {
        for (const c of classes) {
                if (!(c instanceof GenericDAO))
                        throw new TypeError('DAO inserido não é decendente de GenericDAO.');
        }
}


export class UsuarioService {
        #usuarioDAO;

        /**
         * @param {GenericDAO} usuarioDAO 
         */
        constructor(usuarioDAO) {
                verifyExtension(usuarioDAO);

                this.#usuarioDAO = usuarioDAO;
        }

        async getAll() {
                return await this.#usuarioDAO.getAll();
        }

        async getById(id) {
                return await this.#usuarioDAO.getById(id);
        }
}