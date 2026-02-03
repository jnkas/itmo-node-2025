const express = require('express')

const PORT = 3014
const app = express()

const User = require('./models/User.model.js');

app.get('/api/user', async function (req, res) {
    await action()
	res.end();
});

async function action() {

    //Создать
//    const user = await User.create({
//        login: 'admin2@gmail.com',
//        passw: '555555',
//        id_role: 1
//    });

    //read
    // const users = await User.findAll();

    // const oneUser = await User.findOne({ where: 
    //     { login: 'admin@gmail.com' } }
    // );

//     await User.update(
//        { login: 'ivan123@gmail.com' },
//        { where: { id_user: 1 } }
//    );

        await User.destroy({ where: { id_user: 5 } });



    // console.log(oneUser)

}





app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})