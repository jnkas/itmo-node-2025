const dbConnect = require('./../services/db.service')
//методы для того чтобы 
// залогинить
// выход - разлогин
// регистрация

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
            res.json({
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

async function register(req, res, next) {
    
}

async function logout(req, res, next) {
    
}

module.exports = {
    login,
    register,
    logout
}

