const jwt  = require('jsonwebtoken')
const { User } = require('./../models/User')
const { JWT_SECRET } = require('./../middleware/auth') 

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

async function login(req, res, next) {
    console.log(req.body)
    //постучаться в БД и вытащить пользователя по этому логину и проверить пароль
    let data = await dbConnect('db-users')

    data.find({
        selector: {
            username: { "$eq": req.body.email},
        },
        limit:1
    })
    .then(async (userObj) => {
        //получили данные
        console.log(userObj)
        if (req.body.password === userObj.docs[0].password) {
            res.send({
                message: "Успешно авторизован",
                token: userObj.docs[0].token,
                role: userObj.docs[0].role
            })
        }
    })


    // пользователь не найден или пароль неверен - отказ
    // res.status(404).send({})

    // все ОК - даем ключик (полный доступ ко всему || проверить роль)


}



async function logout(req, res, next) {
    
}

module.exports = {
    login,
    register,
    logout
}

