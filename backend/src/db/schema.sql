CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT NOT NULL UNIQUE,
    senhaHash TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,

    categoriaId INTEGER NOT NULL,
    usuarioId INTEGER NOT NULL,

    FOREIGN KEY (categoriaId)
        REFERENCES categorias(id)
        ON DELETE CASCADE,

    FOREIGN KEY (usuarioId)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS avaliacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    avaliacao INTEGER NOT NULL
        CHECK (avaliacao IN (-1, 1)),

    postId INTEGER NOT NULL,
    usuarioId INTEGER NOT NULL,

    FOREIGN KEY (postId)
        REFERENCES posts(id)
        ON DELETE CASCADE,

    FOREIGN KEY (usuarioId)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    UNIQUE(postId, usuarioId)
);


CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    conteudo TEXT NOT NULL,

    postId INTEGER NOT NULL,
    usuarioId INTEGER NOT NULL,

    FOREIGN KEY (postId)
        REFERENCES posts(id),

    FOREIGN KEY (usuarioId)
        REFERENCES usuarios(id)
);