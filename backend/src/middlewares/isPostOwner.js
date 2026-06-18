export function isPostOwner(postService, usuarioService) {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const postId = Number(req.params.id);

            const post = await postService.getById(postId);

            if (!post) {
                return res.status(404).json({
                    message: 'Post não encontrado'
                });
            }

            // checagem de admin (via banco)
            const usuario = await usuarioService.getById(userId);

            if (usuario && usuario.tipo === 'admin') {
                return next();
            }

            // regra de ownership
            if (post.usuarioId !== userId) {
                return res.status(403).json({
                    message: 'Acesso negado'
                });
            }

            next();
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({
                message: 'Erro interno de autorização'
            });
        }
    };
}