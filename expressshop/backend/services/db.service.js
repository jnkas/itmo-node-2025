const nano = require('nano')('http://127.0.0.1:3055');

async function dbConnect (dbName) {

    await nano.auth('admin', 'admin')

    return nano.db.use(dbName)
}

module.exports = dbConnect

