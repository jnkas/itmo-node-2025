const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { JWT_SECRET } = require('../middleware/auth')

//методы для того чтобы 
// залогинить
// выход - разлогин
// регистрация

async function register(req, res, next) {
    try {
        const { email, password, name } = req.body

        if(!email || !password) {
            return res.status(400).json({ message: 'нехватает данных - email и пароль - обязательны'})
        }

        const existingUser = await User.findOne({ where: { email }})
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email уже есть'})
        }

        // все проверки пройдены

        const user = await User.create({ email, password, name: name || null })
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

        res.status(200).json({
            message: 'регистрация успешна',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        })
    } catch (error) {
        next(error)
    }
}

async function patchUser(req, res, next) {
    try {
        const userId = req.params.id
        console.log(req.user)
        if(!req.user) {
            return res.status(400).json({ message: 'Требуется автрризация'})
        }
        
        if(req.user.id !== userId && req.role !== 'admin' ) {
            return res.status(403).json({ message: 'Доступ запрещен'})
        }

        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден'})
        }

        const { email, password, name } = req.body
        const updates = {}

        if (email !== undefined) updates.email = email
        if (password !== undefined) updates.password = password
        if (name !== undefined) updates.name = name

        await user.update(updates)

        res.json({
            message: "Данные обновлены",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })

    } catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ message: 'нехватает данных - email и пароль - обязательны'})
        }

        const user = await User.findOne({ where: { email }})
        
        if (!user) {
            return res.status(400).json({ message: 'Пользователь не валиден'})
        }

        // все проверки пройдены

        const isPasswordValid = user.password == password
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Пароль неверный'})
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' }) 

        res.status(200).json({
            message: 'Авторизация успешна',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        })
    } catch (error) {
        next(error)
    }


}

async function getUser (req, res, next) {
    try {
        const userId = req.params.id

        const user = await User.findByPk((userId), {
            attributes: ['id', 'email', 'name', 'role']
        })

        return res.json(user)

    } catch (error) {
        next(error)
    }
}



async function logout(req, res, next) {
    
}

module.exports = {
    login,
    register,
    patchUser,
    logout
}

