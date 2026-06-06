export class Avaliacao {
        #id = 0;
        #avaliacao = 0;
        #postId = 0;
        #usuarioId = 0;

        constructor(
                id = 0,
                avaliacao = 0,
                postId = 0,
                usuarioId = 0
        ) {
                this.#id = id;
                this.avaliacao = avaliacao;
                this.postId = postId;
                this.usuarioId = usuarioId;
        }

        // Getters

        get id() {
                return this.#id;
        }

        get avaliacao() {
                return this.#avaliacao;
        }

        get postId() {
                return this.#postId;
        }

        get usuarioId() {
                return this.#usuarioId;
        }

        // Setters

        set avaliacao(novaAvaliacao) {
                if (novaAvaliacao !== 1 && novaAvaliacao !== -1) return;

                this.#avaliacao = novaAvaliacao;
        }

        set postId(novoPostId) {
                if (!Number.isInteger(novoPostId)) return;

                this.#postId = novoPostId;
        }

        set usuarioId(novoUsuarioId) {
                if (!Number.isInteger(novoUsuarioId)) return;

                this.#usuarioId = novoUsuarioId;
        }
}
