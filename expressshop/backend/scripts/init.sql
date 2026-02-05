-- Удаляем таблицы если существуют
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- =========================
-- Таблица категорий
-- =========================
CREATE TABLE categories (
    id_category SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    id_parent_category INTEGER,
    CONSTRAINT fk_parent_category
        FOREIGN KEY (id_parent_category)
        REFERENCES categories (id_category)
        ON DELETE SET NULL
);

-- =========================
-- Таблица товаров
-- =========================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    price_opt NUMERIC(10, 2),
    img_url TEXT,
    description TEXT,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories (id_category)
        ON DELETE CASCADE
);

-- =========================
-- Наполнение категорий
-- =========================
INSERT INTO categories (name, id_parent_category) VALUES
('Электроника', NULL),
('Телевизоры', 1),
('Домашний текстиль', NULL),
('Мочалки', 3),
('Посуда', NULL);

-- =========================
-- Наполнение товаров
-- =========================
INSERT INTO products 
(category_id, name, price, price_opt, img_url, description, stock_quantity)
VALUES
(2, 'Телевизор Samsung 55"', 59999.99, 54999.99, '/img/tv_samsung_55.jpg', '4K UHD Smart TV', 15),
(2, 'Телевизор LG 43"', 42999.99, 39999.99, '/img/tv_lg_43.jpg', 'Full HD Smart TV', 20),
(2, 'Телевизор Sony 65"', 89999.99, 84999.99, '/img/tv_sony_65.jpg', 'OLED 4K HDR', 7),

(4, 'Мочалка банная классическая', 199.99, 149.99, '/img/mochalka_classic.jpg', 'Натуральная мочалка', 100),
(4, 'Мочалка с ручками', 299.99, 249.99, '/img/mochalka_handles.jpg', 'Удобная для спины', 80),

(3, 'Полотенце махровое', 899.99, 799.99, '/img/towel.jpg', '100% хлопок', 50),
(3, 'Плед домашний', 2499.99, 2199.99, '/img/plaid.jpg', 'Тёплый и мягкий', 25),

(5, 'Сковорода антипригарная', 1999.99, 1799.99, '/img/pan.jpg', 'Подходит для индукции', 40),
(5, 'Набор тарелок', 2999.99, 2699.99, '/img/plates.jpg', '6 шт, керамика', 30),
(5, 'Кастрюля 5л', 3499.99, 3199.99, '/img/pot.jpg', 'Нержавеющая сталь', 20);


-- =========================
-- USERS
-- =========================
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'admin')),
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    jwt_token TEXT
);

-- =========================
-- ORDERS
-- =========================
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    order_status VARCHAR(20) NOT NULL 
        CHECK (order_status IN ('Создан', 'В процессе', 'Отправлен')),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    product_ids INTEGER[] NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);

ALTER TABLE orders
ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- =========================
-- DEMO USERS
-- =========================
INSERT INTO users (name, role, email, password) VALUES
('Иван Петров', 'admin', 'admin@gmail.com', '1234'),
('Анна Смирнова', 'user', 'annagmail.com', 'password1'),
('Дмитрий Иванов', 'user', 'dimagmail.com', 'password2');

-- =========================
-- DEMO ORDERS
-- product_ids ссылаются на products.id
-- =========================
INSERT INTO orders (user_id, order_status, product_ids) VALUES
(2, 'Создан', ARRAY[1, 4, 7]),
(2, 'В процессе', ARRAY[2, 3]),
(3, 'Отправлен', ARRAY[5, 6, 8]),
(3, 'Создан', ARRAY[9, 10]);