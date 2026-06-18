import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            message: 'Token não enviado'
        });
    }

    const [, token] = header.split(' ');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Token inválido'
        });
    }
}