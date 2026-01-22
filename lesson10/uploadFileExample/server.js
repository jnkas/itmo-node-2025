const express = require('express')
const app = express()
// const fs = require('fs')
const PORT = 3009
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'assets/uploads/')
    },
    filename: (req, file, cb)=> {
        cb(null, "_prefix" + file.originalname)
    }
})

const upload = multer({storage: storage})

app.use(express.static('public'))


app.post('/upload', upload.single('file') ,(req, res)=>{
    console.log(req.file)
    if(req.file) {
        res.json({'message': 'Файл загружен'})
    }
})



app.listen(PORT, ()=>{
    console.log('Сервер запущен на порту ' + PORT)
})