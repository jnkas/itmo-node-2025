
const API_URL = 'http://localhost:3009/api'

// http://localhost:3009/api/products

export async function getAllProducts() {
    const res = await fetch(API_URL + '/products', {
    headers: {
        'Authorization' : typeof User !== 'undefined' ? ("Bearer " + User.token) : ''
        }
    })
    return res.json()
}

export async function getProduct(id) {
    const res = await fetch(API_URL + `/product/${id}`, {
    headers: {
            'Authorization' : typeof User !== 'undefined' ? ("Bearer " + User.token) : ''
        }
    })
    return res.json()
}