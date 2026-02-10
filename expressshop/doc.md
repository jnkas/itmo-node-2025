# Structure

## 1. Структура проекта и масштабирование

Экраны веб-приложения(Страницы)
- Глвная => `/`
- Каталог => `/catalog`
- Категория => `/category/:id`
- Карточка товара => `/product/:id`
- Информационная страница => `/info/:id`
- Авторизация/Регистрацией => `/auth`
- Корзина
- Заказ(процессинг)
- Админка для создания товаров
- Заказы(страница списка)

Основные папки и файлы Frontend часть
- Сервер Vite отдает `index.html` и собирает JS/CSS
- `/src/router` - маршрутизация на клиенте
- `/src/components` - части страниц и страницы целиком
- `/src/api` - Запросы к серверу backend за данными

Основные папки и файлы Backend:

- `config/` — настройки (сейчас только подключение к БД).
- `controllers/` — обработчики запросов (логика API).
- `middleware/` — промежуточные функции (определение пользователя).
- `models/` — Sequelize-модели и связи для получения данных из БД.
- `routes/` — маршруты API.
- `services/` — вспомогательные сервисы(можно вынести логику из контроллера).
- `scripts/` — SQL-скрипт для заполнения БД таблицами и демо-данными и Postman-коллекция для проверки API.
- `server.js` — входная точка сервера.
- `package.json` — зависимости и скрипты.

Как расширять проект:

- Новая сущность

server -> route -> controller -> service -> model

Добавить модель в `models/`, 
подключить в `models/index.js`, 
создать контроллер в `controllers/`, 
объявить маршруты в `routes/api.js`.

- Новая проверка доступа

Пример:

```js
router.get('/orders', requireAuth, orderController.getOrders)
```

## 2. API

Базовый префикс: `<URL>:<PORT>/api`.

Авторизация: `Authorization: Bearer <JWT>`.

### Пользователи

| Метод | Путь | Тело запроса | Ответ (успешный) |
| --- | --- | --- | --- |
| POST | `/users/register` | `{ email, password, name? }` | `201 { message, token, user }` |
| POST | `/users/login` | `{ email, password }` | `200 { message, token, role, user }` |
| POST | `/users/logout` | нет | `200 { message }` |
| GET | `/users/:id` | нет | `200 { id, email, name, role }` |
| PATCH | `/users/:id` | `{ email?, name?, password? }` | `200 { id, email, name, role }` |

Примечания:

- `GET /users/:id` и `PATCH /users/:id` требуют авторизацию. Доступ: владелец или админ.
- Валидация по email(логин) и паролю.

### Товары

| Метод | Путь | Тело запроса | Ответ (успешный) |
| --- | --- | --- | --- |
| GET | `/products` | нет | `200 [ Product ]` |
| GET | `/product/:id` | нет | `200 Product` |

`Product` включает поля: `id`, `category_id`, `name`, `price`, `price_opt`, `img_url`, `description`, `stock_quantity`.

### Категории

| Метод | Путь | Тело запроса | Ответ (успешный) |
| --- | --- | --- | --- |
| GET | `/categories` | нет | `200 [ { id_category, name, id_parent_category } ]` |
| GET | `/categories/:categoryId` | нет | `200 { category, count, products }` |

`GET /categories/:categoryId` возвращает товары категории и минимальные данные о категории.

### Заказы

| Метод | Путь | Тело запроса | Ответ (успешный) |
| --- | --- | --- | --- |
| GET | `/orders` | нет | `200 { count, orders }` |
| POST | `/orders` | `{ user_id, product_ids }` | `201 { message, order }` |

`Order` включает поля: `order_id`, `user_id`, `order_status`, `product_ids`, `createdAt`.


### Ошибки (типично)

- `400` — неверные параметры
- `401` — нужна авторизация
- `403` — доступ запрещен
- `404` — сущность не найдена
- `500` — ошибка сервера

## 3. Пакеты Node.js

### Зависимости из `package.json`

- `cors` — включает CORS для запросов фронтенда.
- `express` — HTTP-сервер и роутинг.
- `jsonwebtoken` — выдача и проверка JWT(авторизация по токену).
- `nano` — клиент CouchDB (используется в `services/db.service.js`).
- `nodemon` — автоперезапуск сервера при разработке.
- `pg` — драйвер PostgreSQL.
- `pg-hstore` — сериализация hstore для Sequelize.
- `sequelize` — ORM для PostgreSQL. Имеет методы получения даных без SQL запросов напрямую

### Ранее использованные пакеты в предыдущих версиях

- `fs` — встроенный модуль Node.js для работы с файловой системой.
- `morgan` — HTTP-логирование запросов.
- `dotenv` — загрузка переменных окружения из `.env`.
- `path` — встроенный модуль Node.js для работы с путями.
- `nodemailer` — отправка email.
- `multer` — обработка загрузки файлов.
- `pg-cursor` — курсоры для PostgreSQL запросов.
- `socket.io` — WebSocket-соединения.
- `md5` — хеширование.
- `nano` — клиент CouchDB (в вашем списке: «Nano для CoachDB»).

### Для фронтенда

- `gulp` — сборщик задач.
- `gulp-autoprefixer` — автопрефиксы для CSS.
- `gulp-clean-css` — минификация CSS.
- `gulp-sass` — компиляция Sass через Gulp.
- `sass` — компилятор Sass.
- `bootstrap` — CSS-фреймворк.
