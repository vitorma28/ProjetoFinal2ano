import { Usuario, Avaliacao, Categoria, Comentario, Post } from '#models';
import { GenericDAO } from './GenericDAO';


export class UsuarioDAO extends GenericDAO {
        constructor(connection = null) {
                super('usuarios', connection, Usuario);
        }
}


export class AvaliacaoDAO extends GenericDAO {
        constructor(connection = null) {
                super('avaliacoes', connection, Avaliacao);
        }
}


export class CategoriaDAO extends GenericDAO {
        constructor(connection = null) {
                super('categorias', connection, Categoria);
        }
}


export class ComentarioDAO extends GenericDAO {
        constructor(connection = null) {
                super('comentarios', connection, Comentario);
        }
}


export class PostDAO extends GenericDAO {
        constructor(connection = null) {
                super('posts', connection, Post);
        }
}

