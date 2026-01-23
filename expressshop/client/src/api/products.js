
const API_URL = 'http://localhost:3009/api'

export async function getAllProducts() {
    const res = await fetch(API_URL + '/products')
    return res.json()
}

export async function getProduct(id) {
    const res = await fetch(API_URL + `/product/${id}`)
    return res.json()
}