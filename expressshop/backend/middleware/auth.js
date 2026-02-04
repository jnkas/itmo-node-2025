const jwt  = require('jsonwebtoken')
const { User } = require('../models')

const JWT_SECRET = 'secret-key-123'

function userIdentify (req, res, next) {
    const authHeader = req.headers['authorization']


    if (!authHeader) {
        req.user = null; // гость
        return next();
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        //Выполнить запрос в БД излечь юзера
        User.findByPk(decoded.userId)
            .then((user)=> {
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

    next()
}

function requireAuth (req, res, next) {
    if(!req.user) {
        return res.status(401).json({ message: 'Требуется авторизация' });
    }
}

function adminOnly (req, res, next) {
    if(req.user && req.user.role === "admin") {
        return next()
    } else {
        return res.status(403).json({ message: 'Access denied' });
    }
}

function userOnly (req, res, next) {
    if(req.user && req.user.role === "user") {
        return next()
    } else {
        return res.status(403).json({ message: 'Access denied' });
    }
}

module.exports = {
    JWT_SECRET,
    userIdentify,
    requireAuth,
    adminOnly,
    userOnly
}