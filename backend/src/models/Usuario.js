export class Usuario {
        #id = 0;
        #nome = '';
        #senhaHash = '';

        constructor(id = 0, nome = '', senhaHash = '') {
                this.#id = id;
                this.nome = nome;
                this.senhaHash = senhaHash;
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

                this.nome = novoNome;
        }

        set senhaHash(novoSenhaHash) {
                if (typeof novoSenhaHash != 'string') return;

                this.senhaHash = novoSenhaHash;
        }
}
