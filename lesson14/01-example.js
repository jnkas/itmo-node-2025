
const { Client } = require('pg')

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
        await client.query(`
            CREATE TABLE IF NOT EXISTS "users2" (
                id_user SERIAL PRIMARY KEY,
                login VARCHAR(50),
                passw VARCHAR(50)
            )
        `)
        console.log('Таблица users2 создана')


    } catch (err) {
        console.log(err.message)
    } finally {
        //закрываем соединение с БД
        await client.end()
    }
}

main()