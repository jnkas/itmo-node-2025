const store = {
    products: []
} 

let request1  = fetch('/api/products')

request1
    .then(res => res.json())
    .then((data)=> {
        store.products = data
    console.log(data)
})

