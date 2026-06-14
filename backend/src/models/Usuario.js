export class Usuario {
        #id = 0;
        #nome = '';
        #senhaHash = '';

        constructor(id = 0, nome = '', senhaHash = '') {
                this.#id = id;
                this.nome = nome;
                this.senhaHash = senhaHash;
        }

        static build({ id = 0, nome = '', senhaHash = '' }) {
                return new Usuario(id, nome, senhaHash);
        }

        static columnsToInsert() {
                return ['nome', 'senhaHash'];
        }

        dataToInsert() {
                return [this.#nome, this.#senhaHash];
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

        // Setters

        set nome(novoNome) {
                if (typeof novoNome != 'string') return;

                this.#nome = novoNome;
        }

        set senhaHash(novoSenhaHash) {
                if (typeof novoSenhaHash != 'string') return;

                this.#senhaHash = novoSenhaHash;
        }
}
