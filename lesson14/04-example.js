/**
 * Получение количества обработанных строк (rowCount)
 */
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

  const selectResult = await client.query('SELECT * FROM "users"');
  console.log('SELECT: строк в результате (rowCount):', selectResult.rowCount);
  console.log('SELECT: строк (rows.length):', selectResult.rows.length);

  const updateResult = await client.query(
    'UPDATE "users" SET passw = $1 WHERE login = $2',
    ['updated', 'root']
  );
  console.log('UPDATE: обновлено строк:', updateResult.rowCount);

  await client.end();
}

main().catch(console.error);
