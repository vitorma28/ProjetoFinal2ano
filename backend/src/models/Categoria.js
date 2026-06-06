export class Categoria {
        #id = 0;
        #nome = '';

        constructor(id = 0, nome = '') {
                this.#id = id;
                this.nome = nome;
        }

        // Getters

        get id() {
                return this.#id;
        }

        get nome() {
                return this.#nome;
        }

        // Setters

        set nome(novoNome) {
                if (typeof novoNome !== 'string') return;

                this.#nome = novoNome;
        }
}
