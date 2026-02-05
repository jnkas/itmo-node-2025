const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { JWT_SECRET } = require('../middleware/auth')

//методы для того чтобы 
// залогинить
// выход - разлогин
// регистрация

async function register(req, res, next) {
    try {
        // console.log("!!!!", req.body)
        const { email, password, name } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' })
        }

        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким email уже существует' })
        }

        const user = await User.create({ email, password, name: name || null })
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

        res.status(201).json({
            message: 'Регистрация успешна',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (err) {
        next(err)
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' })
        }

        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(401).json({ message: 'Неверный email или пароль' })
        }

        const isValid = user.password == password
        if (!isValid) {
            return res.status(401).json({ message: 'Неверный email или пароль' })
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

        res.json({
            message: 'Авторизация успешна',
            token,
            role: user.role,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (err) {
        next(err)
    }
}

async function logout(req, res, next) {
    try {
        // токен хранится на клиенте
        // Логаут = клиент удаляет токен
        res.json({ message: 'Выход выполнен успешно' })
    } catch (err) {
        next(err)
    }
}

async function getUser(req, res, next) {
    try {
        const userId = req.params.id

        const user = await User.findByPk(Number(userId), {
            attributes: ['id', 'email', 'name', 'role']
        })

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }

        // Только владелец или админ может смотреть чужие данные
        if (req.user && (req.user.id === parseInt(userId) || req.user.role === 'admin')) {
            return res.json(user)
        }

        if (!req.user) {
            return res.status(401).json({ message: 'Требуется авторизация' })
        }

        res.status(403).json({ message: 'Доступ запрещен' })
    } catch (err) {
        next(err)
    }
}

async function patchUser(req, res, next) {
    try {
        const userId = req.params.id

        if (!req.user) {
            return res.status(401).json({ message: 'Требуется авторизация' })
        }

        if (req.user.id !== parseInt(userId) && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Доступ запрещен' })
        }

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }

        const { email, name, password } = req.body
        const updates = {}

        if (email !== undefined) updates.email = email
        if (name !== undefined) updates.name = name
        if (password !== undefined) updates.password = password

        await user.update(updates)

        res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser,
    patchUser
}
