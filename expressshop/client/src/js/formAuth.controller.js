export function formController () {

    if (!window.User) window.User = {}

    const $form = document.querySelector('#auth')

    if($form === null) return

    $form.addEventListener('submit', (e)=> {
        e.preventDefault()

        let objData = {
            email: $form.querySelector('[name="authEmail"]').value,
            password: $form.querySelector('[name="authPassword"]').value
        }

        fetch('http://localhost:3009/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objData)
        })
        //ответ сервера
        .then(res => res.json())
        .then((data)=> {
            window.User = data

        })
    })
}

