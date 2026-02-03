const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'db-express'
});

async function main() {
  await client.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      'INSERT INTO "user" (login, passw) VALUES ($1, $2)',
      ['tx_user1', 'pass1']
    );
    await client.query(
      'INSERT INTO "user" (login, passw) VALUES ($1, $2)',
      ['tx_user2', 'pass2']
    );

    await client.query('COMMIT');
    console.log('Транзакция успешно завершена (COMMIT)');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Ошибка, откат (ROLLBACK):', err.message);
  } finally {
    await client.end();
  }
}

main();