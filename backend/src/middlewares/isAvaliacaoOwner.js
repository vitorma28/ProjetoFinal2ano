export function isAvaliacaoOwner(avaliacaoService, usuarioService) {
    return async (req, res, next) => {
        const userId = parseInt(req.user.id);
        const avaliacaoId = parseInt(req.params.id);

        let user;
        let avaliacao;

        try {
            user = await usuarioService.getById(userId);
            avaliacao = await avaliacaoService.getById(avaliacaoId);
        }
        catch (err) {
            return res.status(err.code).json({
                message: err.message
            });
        }

        if (!user) {
            return res.status(401).json({
                message: 'Usuário inválido'
            });
        }

        if (user.tipo === 'admin') {
            return next();
        }

        if (avaliacao.usuarioId === userId) {
            return next();
        }

        return res.status(403).json({
            message: 'Acesso negado'
        });
    };
}