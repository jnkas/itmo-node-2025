
const { Client } = require('pg')
const Cursor = require('pg-cursor')

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "db-express"
})

async function main() {
    try {
        //открываем соединение с БД
        await client.connect()
        console.log("Коннект к БД поднят")

        //Транзакции
        let result = await client.query(`
            SELECT id_user, login, passw FROM "users"
        `)
        console.log('Итерация выборки по 1 записи')

        for (const row of result.rows) {
            console.log("Строка: ", row.id_user, row.login, row.passw)
            console.log('_______')
        }

        console.log('порциями по 2 записи')
        const cursor = client.query(new Cursor(`
            SELECT id_user, login, passw FROM "users"
        `))

        let rows
        do {
            rows = await cursor.read(2)
            for (const row of result.rows) {
            console.log("Строка: ", row.id_user, row.login, row.passw)
            }
            console.log('_______')
        } while (rows.length === 2)


    } catch (err) {
        console.log(err.message)
    } finally {
        //закрываем соединение с БД
        await client.end()
    }
}

main()