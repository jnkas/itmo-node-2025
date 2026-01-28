import { header } from "./../../header/header.js"

export async function pageAuthorization(params) {

    const headerComponent = header()

    const tpl = `
        
        ${headerComponent}
        <!-- Основной контент -->
        <main class="container">
            <h2 class="mb-4">Авторизация</h2>
            <form id="auth">
                <!-- Email input -->
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="form2Example1" class="form-control" name="authEmail"/>
                    <label class="form-label" for="form2Example1">Email address</label>
                </div>

                <!-- Password input -->
                <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form2Example2" class="form-control" name="authPassword"/>
                    <label class="form-label" for="form2Example2">Password</label>
                </div>

                <!-- Submit button -->
                <button type="submit" 
                        data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4
                ">Отправить</button>

            </form>
            <script src='/formAuth.controller.js'></script>

            
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