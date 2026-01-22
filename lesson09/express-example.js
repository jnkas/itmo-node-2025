const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const app = express()
const fs = require('fs')
const PORT = 3009
const morgan = require('morgan')

const yaKey = process.env.API_YA_MAIL_KEY

console.log(yaKey)

const requestHandler = (req, res, next) => {
    console.log('Запрос. Тип запроса:' + req.method + ' ' + req.url)
    next()
}

const apiRouter = require('./routes/api.js')

const logDirectory = 'logs'
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const fileLogStream = fs.createWriteStream(path.join(logDirectory, 'log.txt'), {flags: 'a'})

app.use(morgan('tiny', {stream: fileLogStream}))

app.use('/api', apiRouter)

app.use(express.static('public'))

app.use('/css/bootstrap', express.static('./node_modules/bootstrap/dist/css'))

app.use((req, res, next)=> {
    res.send(`
        <h1>404 - Страница не найдена</h1>    
    `)
})

// const sendMailToAdmin = (data)=> {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.yandex.ru",
//         port: 465,
//         secure: true, // Use true for port 465, false for port 587
//         auth: {
//             user: "login",
//             pass: "",
//         },
//     });

//     // Send an email using async/await
//     (async () => {
//     const info = await transporter.sendMail({
//         from: 'myyaemail@yandex.ru',
//         to: `myyadminemail@google.com`,
//         subject: "Новый коментарий с сайта",
//         html: "<b></b>", // HTML version of the message
//     });

//     console.log("Message sent:", info.messageId);
//     })();
// }



app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})

