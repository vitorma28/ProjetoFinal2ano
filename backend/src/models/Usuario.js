export class Usuario {
        #id = 0;
        #nome = '';
        #senhaHash = '';
        #tipo = '';
        #fotoPerfil = '';

        constructor(id = 0, nome = '', senhaHash = '', tipo = '', fotoPerfil = '') {
                this.#id = id;
                this.nome = nome;
                this.senhaHash = senhaHash;
                this.tipo = tipo;
                this.fotoPerfil = fotoPerfil;
        }

        static build({ id = 0, nome = '', senhaHash = '', tipo = '', fotoPerfil = '' }) {
                return new Usuario(id, nome, senhaHash, tipo, fotoPerfil);
        }

        static columnsToInsert() {
                return ['nome', 'senhaHash', 'tipo', 'fotoPerfil'];
        }

        dataToInsert() {
                return [this.#nome, this.#senhaHash, this.#tipo, this.#fotoPerfil];
        }

        toJSON(...ocult) {
                const keys = Usuario.columnsToInsert();
                const values = this.dataToInsert();

                let obj = {};

                for (const i in keys) {
                        if (ocult.includes(keys[i])) continue;
                        
                        obj[keys[i]] = values[i];
                }

                return obj;
        }

        // Getters

        get id() {
                return this.#id;
        }

        get nome() {
                return this.#nome;
        }

        get senhaHash() {
                return this.#senhaHash;
        }

        get tipo() {
                return this.#tipo;
        }

        get fotoPerfil() {
                return this.#fotoPerfil;
        }

        // Setters

        set nome(novoNome) {
                if (typeof novoNome != 'string') return;

                this.#nome = novoNome;
        }

        set senhaHash(novoSenhaHash) {
                if (typeof novoSenhaHash != 'string') return;

                this.#senhaHash = novoSenhaHash;
        }

        set tipo(novoTipo) {
                if (typeof novoTipo != 'string') return;

                this.#tipo = novoTipo;
        }

        set fotoPerfil(novaFotoPerfil) {
                if (typeof novaFotoPerfil != 'string') return;

                this.#fotoPerfil = novaFotoPerfil;
        }
}
