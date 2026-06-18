export class Comentario {
        #id = 0;
        #conteudo = '';
        #postId = 0;
        #usuarioId = 0;

        constructor(
                id = 0,
                conteudo = '',
                postId = 0,
                usuarioId = 0
        ) {
                this.#id = id;
                this.conteudo = conteudo;
                this.postId = postId;
                this.usuarioId = usuarioId;
        }

        static build({
                id = 0,
                conteudo = '',
                postId = 0,
                usuarioId = 0
        }) {
                return new Comentario(id, conteudo, postId, usuarioId);
        }

        static columnsToInsert() {
                return ['conteudo', 'postId', 'usuarioId'];
        }

        dataToInsert() {
                return [this.#conteudo, this.#postId, this.#usuarioId];
        }

        toJSON(...ocult) {
                const keys = ['id', ...Comentario.columnsToInsert()];
                const values = [this.#id, ...this.dataToInsert()];

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

        get conteudo() {
                return this.#conteudo;
        }

        get postId() {
                return this.#postId;
        }

        get usuarioId() {
                return this.#usuarioId;
        }

        // Setters

        set conteudo(novoConteudo) {
                if (typeof novoConteudo !== 'string') return;

                this.#conteudo = novoConteudo;
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
