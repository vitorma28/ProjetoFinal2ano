-- 1. Populando a tabela de Usuários
-- (Considerando senhas fictícias em texto aberto apenas para ilustração do seed)
INSERT INTO usuarios (nome, senhaHash, tipo, fotoPerfil) VALUES
('alice_admin', '$2b$12$K7w0Xj...', 'admin', 'alice.jpg'),
('bob_user', '$2b$12$R9y1Za...', 'default', 'bob.png'),
('carlos_dev', '$2b$12$P3q2Ws...', 'default', 'carlos.webp');

-- 2. Populando a tabela de Categorias
INSERT INTO categorias (nome) VALUES
('Tecnologia'),
('Games'),
('Culinária');

-- 3. Populando a tabela de Posts
-- Relacionando com os IDs gerados acima (1: alice_admin, 2: bob_user / 1: Tecnologia, 2: Games)
INSERT INTO posts (titulo, conteudo, fotoApresentacao, categoriaId, usuarioId) VALUES
('O Futuro da IA em 2026', 'A inteligência artificial está moldando o desenvolvimento de software...', 'ia_future.jpg', 1, 1),
('Review: Elden Ring', 'Um dos melhores jogos de mundo aberto já criados...', 'elden_ring.jpg', 2, 2),
('Como fazer a massa de pizza perfeita', 'O segredo está no tempo de fermentação e na hidratação da farinha...', 'pizza.jpg', 3, 2);

-- 4. Populando a tabela de Avaliações (Likes/Dislikes)
-- Restrição: UNIQUE(postId, usuarioId) respeitada. Valores: 1 ou -1.
INSERT INTO avaliacoes (avaliacao, postId, usuarioId) VALUES
(1, 1, 2),  -- Bob deu UP no post da Alice
(1, 1, 3),  -- Carlos deu UP no post da Alice
(1, 2, 1),  -- Alice deu UP no post do Bob
(-1, 3, 1); -- Alice deu DOWN no post de culinária do Bob

-- 5. Populando a tabela de Comentários
INSERT INTO comentarios (conteudo, postId, usuarioId) VALUES
('Artigo sensacional! Realmente a automação mudou tudo.', 1, 2), -- Bob no post da Alice
('Discordo um pouco sobre a fermentação, prefiro 48h na geladeira.', 3, 3), -- Carlos no post do Bob
('Melhor jogo da década, sem dúvidas.', 2, 1); -- Alice no post do Bob