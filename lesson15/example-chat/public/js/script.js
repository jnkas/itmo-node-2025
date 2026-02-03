window.addEventListener('DOMContentLoaded', ()=> {
    let socket = io.connect(location.origin)
    
    //  socket.on()

    socket.on('new-message', (data)=> {
        addNewMessage(data, socket)
    })

    socket.on('history', (arr)=> {
        for(let i =0; i< arr.length; i++) {
            addNewMessage(arr[i], socket)
        }    
    })



    let btnSend = document.querySelector('.btn-send')
    let textArea = document.querySelector('#edit-message')

    btnSend.addEventListener("click", (e)=> {
        let message = textArea.value
        if(message) {
            socket.emit('new-message', {
                text: message,
                time: new Date(),
                login: 'Аноним'
            })

            textArea.value = ''
        }
    })

})

function addNewMessage (data, socket) {
    console.log(data)
    let divMessage = document.createElement('div')
    let divRow = document.createElement('div')

    divRow.classList.add('row')
    divMessage.classList.add('message')

    if(data.id === socket.id) {
        //тут проверка на авторство

        divRow.classList.add('my')
        divMessage.classList.add('my')
    }

    divMessage.innerText = data.text
    divRow.appendChild(divMessage)

    document.querySelector('.area-chat').appendChild(divRow)





}

