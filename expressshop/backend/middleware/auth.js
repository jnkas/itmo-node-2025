const jwt = require('jsonwebtoken')
const { User } = require('../models')

const JWT_SECRET = 'secret-key-123'

function userIdentify(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null
        return next()
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        User.findByPk(decoded.userId)
            .then((user) => {
                if (user) {
                    req.user = user
                    req.userId = user.id
                } else {
                    req.user = null
                }
                next()
            })
            .catch(() => {
                req.user = null
                next()
            })
    } catch {
        req.user = null
        return next()
    }
}

function requireAuth(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Требуется авторизация' })
    }
    next()
}

function adminOnly(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next()
    }
    return res.status(403).json({ message: 'Доступ запрещен' })
}

function userOnly(req, res, next) {
    if (req.user && req.user.role === 'user') {
        return next()
    }
    return res.status(403).json({ message: 'Доступ запрещен' })
}

module.exports = {
    JWT_SECRET,
    userIdentify,
    requireAuth,
    adminOnly,
    userOnly
}
