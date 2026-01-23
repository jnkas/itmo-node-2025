import { pageCatalog } from "./../src/components/pages/pageCatalog/pageCatalog"
import { pageHome } from "./../src/components/pages/pageHome/pageHome"


export function router (url) {

    let pageComponent

    if(url === '/') pageComponent = pageHome
    if(url === '/catalog') pageComponent = pageCatalog
    // if(url === '/product/:id') pageComponent = pageCatalog

    // if(url === '/info') pageComponent = ..

    // if(!pageComponent) pageComponent = page404

    history.pushState(null, '', url)

    return pageComponent

}