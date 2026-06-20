export function isComentarioOwner(comentarioService, usuarioService) {
        return async (req, res, next) => {
                const userId = parseInt(req.user.id);
                const comentarioId = parseInt(req.params.id);

                let user;

                try {
                        user = await usuarioService.getById(userId);
                }
                catch (err) {
                        return res.status(err.status).json({
                                message: err.message
                        });
                }

                if (!user) {
                        return res.status(401).json({ message: 'Usuário inválido' });
                }

                let comment;

                try {
                        comment = await comentarioService.getById(comentarioId);
                }
                catch (err) {
                        return res.status(err.status).json({
                                message: err.message
                        });
                }

                if (!comment) {
                        return res.status(401).json({ message: 'Comentário inválido' });
                }
                

                if (user.tipo == 'admin') {
                        return next();
                }

                if (comment.usuarioId == user.id) {
                        return next();
                }

                return res.status(403).json({
                        message: 'Acesso negado'
                });
        };
}