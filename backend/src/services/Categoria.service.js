import bcryptjs from 'bcryptjs';
import { GenericDAO } from "#daos";
import { Categoria } from "#models";
import { HTTPError } from './HTTPError.js';


function verifyExtension(...classes) {
        for (const c of classes) {
                if (!(c instanceof GenericDAO))
                        throw new TypeError('DAO inserido não é decendente de GenericDAO.');
        }
}

export class CategoriaService {
    #categoriaDAO;

    constructor(categoriaDAO) {
        verifyExtension(categoriaDAO);

        this.#categoriaDAO = categoriaDAO;
    }

    async create(nome) {
        const categorias =
            await this.#categoriaDAO.getAll();

        if (
            categorias.find(c => c.nome === nome)
        ) {
            throw new HTTPError(
                409,
                `Já existe uma categoria com o nome ${nome}.`
            );
        }

        const categoria =
            new Categoria(0, nome);

        await this.#categoriaDAO.insert(categoria);
    }

    async remove(id) {
        const categoria =
            await this.#categoriaDAO.getById(id);

        if (!categoria) {
            throw new HTTPError(
                404,
                `Categoria com ID ${id} não existe.`
            );
        }

        await this.#categoriaDAO.remove(id);
    }

    async update(id, changes) {
        const categoria =
            await this.#categoriaDAO.getById(id);

        if (!categoria) {
            throw new HTTPError(
                404,
                `Categoria com ID ${id} não existe.`
            );
        }

        if (
            'id' in changes ||
            !this.#areValidChanges(changes)
        ) {
            throw new HTTPError(
                400,
                `Alteração não permitida para categoria de ID ${id}.`
            );
        }

        await this.#categoriaDAO.update(
            id,
            changes
        );
    }

    #areValidChanges(changes) {
        const keys = Object.keys(changes);

        for (const k of keys) {
            if (
                !Categoria
                    .columnsToInsert()
                    .includes(k)
            ) {
                return false;
            }
        }

        return true;
    }

    async getAll() {
        return await this.#categoriaDAO.getAll();
    }

    async getById(id) {
        const categoria =
            await this.#categoriaDAO.getById(id);

        if (!categoria) {
            throw new HTTPError(
                404,
                `Categoria com ID ${id} não existe.`
            );
        }

        return categoria;
    }
}
