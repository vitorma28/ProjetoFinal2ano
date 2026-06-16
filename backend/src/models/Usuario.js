export class Usuario {
        #id = 0;
        #nome = '';
        #senhaHash = '';
        #tipo = '';

        constructor(id = 0, nome = '', senhaHash = '', tipo = '') {
                this.#id = id;
                this.nome = nome;
                this.senhaHash = senhaHash;
        }

        static build({ id = 0, nome = '', senhaHash = '', tipo = '' }) {
                return new Usuario(id, nome, senhaHash, tipo);
        }

        static columnsToInsert() {
                return ['nome', 'senhaHash', 'tipo'];
        }

        dataToInsert() {
                return [this.#nome, this.#senhaHash, this.#tipo];
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
}
