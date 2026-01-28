
export function header() {
    const tpl =`
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
                                <a class="nav-link" href="/login">Вход</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/registration">Регистрация</a>
                            </li>
                            ${typeof User !== 'undefined' && User.role === 'admin' ? 
                                '<li class="nav-item"><a class="nav-link" href="/admin">Админка</a></li>'
                                : ''
                            }
                            
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
    `
    
    return tpl
}