export function isUsuarioOwner(usuarioService) {
    return async (req, res, next) => {
        const userId = req.user.id;
        const targetId = Number(req.params.id);

        if (userId === targetId) {
            return next();
        }

        let user

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

        if (user.tipo === 'admin') {
            return next();
        }

        return res.status(403).json({
            message: 'Acesso negado'
        });
    };
}