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
        let result = await client.query(`
            SELECT id_user, login, passw FROM "users" WHERE id_user = $1
        `,
        [1]
        )

        if (result.rows.length>0) {
            console.log("Пользователь ", result.rows[0])
        }

        // Один пользователь по login
        const byLogin = await client.query(
            'SELECT * FROM "users" WHERE login = $1',
            ['root']
        );
        console.log('По login:', byLogin.rows[0]);

        // Все пользователи
        const all = await client.query('SELECT * FROM "users"');
        console.log('Всего:', all.rows.length, all.rows);

        // Обновить пароль у пользователя с login = 'root'
        const result2 = await client.query(
        'UPDATE "user" SET passw = $1 WHERE login = $2',
        ['new_password', 'root']
        );
        console.log('Обновлено строк:', result2.rowCount);

        // Обновить несколько полей
        await client.query(
        'UPDATE "user" SET login = $1, passw = $2 WHERE id_user = $3',
        ['new_login', 'new_pass', 1]
        );

        // Удалить одного пользователя по id
        // const result = await client.query(
        // 'DELETE FROM "users" WHERE id_user = $1',
        // [5]
        // );
        

    } catch (err) {
        console.log(err.message)
    } finally {
        //закрываем соединение с БД
        await client.end()
    }
}

main()