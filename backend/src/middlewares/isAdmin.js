export function isAdmin(usuarioService) {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            const usuario = await usuarioService.getById(userId);

            if (!usuario) {
                return res.status(401).json({
                    message: 'Usuário não autenticado'
                });
            }

            if (usuario.tipo !== 'admin') {
                return res.status(403).json({
                    message: 'Acesso restrito a administradores'
                });
            }

            next();
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({
                message: 'Erro interno no middleware de autorização'
            });
        }
    };
}