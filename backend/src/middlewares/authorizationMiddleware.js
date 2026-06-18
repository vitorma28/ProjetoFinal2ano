export function selfOrAdminMiddleware(usuarioService) {
    return async (req, res, next) => {
        const userId = req.user.id;
        const targetId = Number(req.params.id);

        if (userId === targetId) {
            return next();
        }

        const user = await usuarioService.getById(userId);

        if (!user) {
            return res.status(401).json({ message: 'Usuário inválido' });
        }

        if (user.tipo === 'admin') {
            return next();
        }

        return res.status(403).json({
            message: 'Acesso negado'
        });
    };
}