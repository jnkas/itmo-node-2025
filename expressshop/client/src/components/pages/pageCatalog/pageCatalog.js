import { header } from "./../../header/header.js"
import { getAllProducts } from "../../../api/products.js"
import { productCard } from "../../productCard/productCard.js"

export async function pageCatalog(params) {

    const data = await getAllProducts()

    console.log(data)
    const arr = ''
    const headerComponent = header()

    const tpl = `
        
        ${headerComponent}
        <!-- Основной контент -->
        <main class="container">
            <h2 class="mb-4">Каталог товаров</h2>
            
            <!-- Блок с карточками товаров -->
            <div id="catalog">
                ${(data.map((item)=> productCard(item)).join(''))}
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