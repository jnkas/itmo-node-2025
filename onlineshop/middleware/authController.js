const ADMIN_TOKEN = 'Bearer admin_token_123'

const middlewareAuthController = (token) => {
    // if (!token) token.split(' ')[1]
    let isTokenCorrect = false
    if (token === ADMIN_TOKEN) isTokenCorrect = true
    return isTokenCorrect
}

module.exports = {
    middlewareAuthController
}