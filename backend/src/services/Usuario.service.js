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

export class UsuarioService {
        #usuarioDAO;

        /**
         * @param {GenericDAO} usuarioDAO 
         */
        constructor(usuarioDAO) {
                verifyExtension(usuarioDAO);

                this.#usuarioDAO = usuarioDAO;
        }

        async login(nome, senhaRaw) {
                const usuarios = await this.#usuarioDAO.getAll();

                const usuario = usuarios.find(u => u.nome === nome);

                if (!usuario) {
                        throw new HTTPError(401, 'Credenciais inválidas.');
                }

                const ok = await bcryptjs.compare(
                        senhaRaw,
                        usuario.senhaHash
                );

                if (!ok) {
                        throw new HTTPError(401, 'Credenciais inválidas.');
                }

                const token = jwt.sign(
                        {
                                id: usuario.id,
                                nome: usuario.nome
                        },
                        JWT_SECRET,
                        { expiresIn: '2h' }
                );

                return token;
        }

        async create(name, senhaRaw, tipo) {
                const users = await this.#usuarioDAO.getAll();

                if (users.find(u => u.name === name)) {
                        throw new HTTPError(409, `Já existe um usuário com o nome ${name}.`);
                }

                const hashedPassword = await bcryptjs.hash(senhaRaw, 10);

                const user = new Usuario(0, name, hashedPassword, tipo, '/none.png');

                await this.#usuarioDAO.insert(user);
        }

        async remove(id) {
                const user = await this.#usuarioDAO.getById(id);

                if (!user) {
                        throw new HTTPError(404, `Usuário de ID ${id} não foi encontrado.`);
                }

                await this.#usuarioDAO.remove(id);
        }

        async update(id, changes) {
                const user = await this.#usuarioDAO.getById(id);

                if (!user) {
                        throw new HTTPError(404, `Usuário com ID ${id} não existe.`);
                }

                if ('id' in changes || !this.#areValidChanges(changes)) {
                        throw new HTTPError(400, `Alteração não permitida para usuário de ID ${id}.`);
                }

                await this.#usuarioDAO.update(id, changes);
        }

        #areValidChanges(changes) {
                const keys = Object.keys(changes);
                
                for (const k of keys) {
                        if (!Usuario.columnsToInsert().includes(k)) return false;
                }

                return true;
        }

        async getAll() {
                const users = await this.#usuarioDAO.getAll();
                
                return users;
        }

        async getById(id) {
                const user = await this.#usuarioDAO.getById(id);

                if (!user) {
                        throw new HTTPError(404, `Usuário de ID ${id} não foi encontrado.`);
                }
                
                return user;
        }
}