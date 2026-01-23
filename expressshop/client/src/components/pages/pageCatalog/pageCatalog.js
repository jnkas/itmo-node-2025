

export function pageCatalog(params) {

    const tpl = `
        <!-- Header -->
        <header class="header-bg border-bottom mb-4">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light py-3">
                    <!-- Логотип -->
                    <a class="navbar-brand fw-bold" href="#">
                        <i class="bi bi-shop"></i> Каталог
                    </a>
                    
                    <!-- Кнопка для мобильного меню -->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <!-- Поиск -->
                    <div class="flex-grow-1 mx-3">
                        <form action="/api/find" class="d-flex" role="search" id="search">
                            <input class="form-control me-2" type="search" placeholder="Поиск товаров..." name="searchValue">
                            <button class="btn btn-outline-primary" type="submit">
                                <i class="bi bi-search"></i>
                            </button>
                        </form>
                    </div>
                    
                    <!-- Меню -->
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link active" href="/">Главная</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/catalog">Каталог</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">О нас</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Контакты</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    <i class="bi bi-cart"></i> Корзина
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>

        <!-- Основной контент -->
        <main class="container">
            <h2 class="mb-4">Каталог товаров</h2>
            
            <!-- Блок с карточками товаров -->
            <div id="catalog">
                
            </div>
            
        </main>

        <!-- Footer -->
        <footer class="bg-light border-top mt-5 py-4">
            <div class="container">
                <div class="row">
                    <!-- Колонка 1 -->
                    <div class="col-md-4">
                        <h5 class="mb-3">Категории</h5>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-decoration-none text-muted">Электроника</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Компьютеры</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Смартфоны</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Аксессуары</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Гаджеты</a></li>
                        </ul>
                    </div>
                    
                    <!-- Колонка 2 -->
                    <div class="col-md-4">
                        <h5 class="mb-3">Информация</h5>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-decoration-none text-muted">О компании</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Доставка</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Оплата</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Гарантия</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Контакты</a></li>
                        </ul>
                    </div>
                    
                    <!-- Колонка 3 -->
                    <div class="col-md-4">
                        <h5 class="mb-3">Помощь</h5>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-decoration-none text-muted">Вопросы и ответы</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Возврат товара</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Политика конфиденциальности</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Условия использования</a></li>
                            <li><a href="#" class="text-decoration-none text-muted">Поддержка</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    `

    return tpl
}