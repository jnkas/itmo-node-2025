# ExpressShop


Frontend: SPA на vite + JS для последующей замены на VUE

Backend: REST API на Express + Sequelize. База — PostgreSQL.

## Запуск

1. Установить зависимости:

```bash
npm install
```

2. Поднять PostgreSQL и создать БД `db-express` (логин/пароль берутся из `config/db.js`).

3. (Опционально) Инициализировать таблицы и демо-данные(можно через pgAdmin):

```bash
psql -U postgres -d db-express -f /expressshop/backend/scripts/init.sql
```

4. Запустить сервер:

```bash
node /backend/server.js
```

С автоперезапуском:

```bash
nodemon /backend/server.js
```

## Frontend часть

- Базовый URL: `http://localhost:5173`
- Маршрутизация на клиенте


## Backend часть

- Базовый URL API: `http://localhost:3009/api`
- Формат обмена: JSON
- CORS включён для `/api`
- Авторизация: `Authorization: Bearer <JWT>`


Примеры точек входа:

- `GET /api/products` — список товаров
- `GET /api/categories` — список категорий
- `POST /api/users/login` — логин, возвращает JWT

Подробности по всем путям см. в `structure.md`.
