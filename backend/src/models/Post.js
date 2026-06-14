export class Post {
        #id = 0;
        #titulo = '';
        #conteudo = '';
        #categoriaId = 0;
        #usuarioId = 0;

        constructor(
                id = 0,
                titulo = '',
                conteudo = '',
                categoriaId = 0,
                usuarioId = 0
        ) {
                this.#id = id;
                this.titulo = titulo;
                this.conteudo = conteudo;
                this.categoriaId = categoriaId;
                this.usuarioId = usuarioId;
        }

        static build({
                id = 0,
                titulo = '',
                conteudo = '',
                categoriaId = 0,
                usuarioId = 0
        }) {
                return new Post(id, titulo, conteudo, categoriaId, usuarioId);
        }

        static columnsToInsert() {
                return ['titulo', 'conteudo', 'categoriaId', 'usuarioId'];
        }

        dataToInsert() {
                return [this.#titulo, this.#conteudo, this.#categoriaId, this.#usuarioId];
        }

        // Getters

        get id() {
                return this.#id;
        }

        get titulo() {
                return this.#titulo;
        }

        get conteudo() {
                return this.#conteudo;
        }

        get categoriaId() {
                return this.#categoriaId;
        }

        get usuarioId() {
                return this.#usuarioId;
        }

        // Setters

        set titulo(novoTitulo) {
                if (typeof novoTitulo !== 'string') return;

                this.#titulo = novoTitulo;
        }

        set conteudo(novoConteudo) {
                if (typeof novoConteudo !== 'string') return;

                this.#conteudo = novoConteudo;
        }

        set categoriaId(novoCategoriaId) {
                if (!Number.isInteger(novoCategoriaId)) return;

                this.#categoriaId = novoCategoriaId;
        }

        set usuarioId(novoUsuarioId) {
                if (!Number.isInteger(novoUsuarioId)) return;

                this.#usuarioId = novoUsuarioId;
        }
}
