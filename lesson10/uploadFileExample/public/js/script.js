console.log('1')

function getAllComments () {
    fetch('api/allcomments')
        .then(res => res.json())
        .then((arr)=>{
            console.log(arr)
            let $commetnsDOMNode = document.querySelector('.comments')
            for (let i=0; i < arr.length; i++) {
                let div = document.createElement('div')
                div.classList.add('comment')
                div.innerHTML = `
                    <div>${arr[i].name}</div>
                    <div>${arr[i].message}</div>
                    <div>${arr[i].date}</div>
                `
                div.addEventListener('click', ()=>{
                    location.href = '/api/comment/' + i
                })
                div.style.cursor = 'pointer'

                $commetnsDOMNode.appendChild(div)
            }
        })
}

function sendComment() {
    let data = {
        name: user.value,
        message: message.value,
        date: moment().format('YYYY.MM.DD hh:mm')
    }

    fetch('api/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(()=> {
        document.querySelector('.comments').innerHTML = ''
        getAllComments()
    })
} 

function sendFile() {

    const $fileUploader = document.querySelector('#fileUploader')
    const file = $fileUploader.files[0]

    const formData = new FormData()

    formData.append('file', file)
    

    fetch('/upload', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // },
        body: formData
    }).then(()=> {
        // document.querySelector('.comments').innerHTML = ''
        // getAllComments()
    })
} 

document.addEventListener('DOMContentLoaded', ()=> {
    // getAllComments () //запросили комменты

    //отправляем комменты
    let $btn = document.querySelector('.btn')
    $btn.addEventListener('click', ()=> {
        //сбор и отправка данных формы
        // sendComment()
        sendFile()
    })


})