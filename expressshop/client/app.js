import {pageHome} from './src/components/pages/pageHome/pageHome.js'
import {router} from './router/router'

const appContainer = document.getElementById('app')

appContainer.innerHTML = pageHome()

document.addEventListener('DOMContentLoaded', (e)=> {

    document.addEventListener('click', (e)=> {
        if (e.target.closest('a')) {
            e.preventDefault();
            console.log(e.target.href)
            let route = new URL(e.target.href).pathname
            let pageComponent = router(route)
            appContainer.innerHTML = pageComponent()

        }
    })

})