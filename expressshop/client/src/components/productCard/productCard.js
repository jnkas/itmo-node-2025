
export function productCard(obj) {

    // data = {
    //     name: "Товар 1",
    //     price: "99999", 
    //     raiting: "4.9"
    // }

    let price = ''
    if(obj.price) price = obj.price.toLocaleString('ru-RU')

    const tpl = `
        
            <div class="card product-card">
                <img src="${obj.image_path}" class="card-img-top product-image" alt="${obj.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${obj.name}</h5>
                    <div class="rating mb-2">
                        <i class="bi bi-star-${(obj.raiting > 0) ? 'fill' : 'half'}"></i>
                        <i class="bi bi-star-${(obj.raiting > 1) ? 'fill' : 'half'}"></i>
                        <i class="bi bi-star-${(obj.raiting > 2) ? 'fill' : 'half'}"></i>
                        <i class="bi bi-star-${(obj.raiting > 3) ? 'fill' : 'half'}"></i>
                        <i class="bi bi-star-${(obj.raiting > 4) ? 'fill' : 'half'}"></i>
                        <span class="text-muted ms-1">(${obj.raiting})</span>
                    </div>
                    <p class="card-text text-primary fw-bold fs-4 mt-auto">${price}₽</p>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
        
    `

    return tpl
}