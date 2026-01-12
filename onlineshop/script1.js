const store = {
    products: []
} 

let request1  = fetch('/api/products')

const renderCatalog = () => {
    const $container = document.querySelector('#catalog')

    $container.innerHTML = ''

    let $row = document.createElement('div')
    $row.classList.add('row', 'g-4', 'mb-4')

    let $row2 = document.createElement('div')
    $row2.classList.add('row', 'g-4', 'mb-4')

    let counter = 0

    for (let item of store.products) {

        let image_path = !typeof 'undefined' ? item.image_path : ''
        let name = item.name
        let price = +item.price //25 990 ₽
        let raiting = item.raiting

        let $card = document.createElement('div')
        $card.classList.add('col-5-cards')

        $card.innerHTML = `
            
                <div class="card product-card">
                    <img src="${image_path}" class="card-img-top product-image" alt="${name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${name}</h5>
                        <div class="rating mb-2">
                            <i class="bi bi-star-${(raiting > 0) ? 'fill' : 'half'}"></i>
                            <i class="bi bi-star-${(raiting > 1) ? 'fill' : 'half'}"></i>
                            <i class="bi bi-star-${(raiting > 2) ? 'fill' : 'half'}"></i>
                            <i class="bi bi-star-${(raiting > 3) ? 'fill' : 'half'}"></i>
                            <i class="bi bi-star-${(raiting > 4) ? 'fill' : 'half'}"></i>
                            <span class="text-muted ms-1">(${raiting})</span>
                        </div>
                        <p class="card-text text-primary fw-bold fs-4 mt-auto">${price.toLocaleString('ru-RU')}₽</p>
                        <button class="btn btn-primary">В корзину</button>
                    </div>
                </div>
            
        `
        counter++
        if (counter < 6) $row.append($card)
        else $row2.append($card)
    }

    $container.append($row)
    $container.append($row2)
}

request1
    .then(res => res.json())
    .then((data)=> {
        //момент получения и разбора json
        store.products = data
        renderCatalog()

    console.log(data)
})


document.querySelector('#search').addEventListener('submit', (e)=> {
    e.preventDefault()
    let value = document.querySelector('#search input[name="searchValue"]').value
    console.log(value)

    fetch('/api/find/?searchValue='+ value)
    .then(res => res.json())
    .then((data)=> {
        store.products = data
        renderCatalog()
    })
})

