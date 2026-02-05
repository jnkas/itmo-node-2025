const { Product, Category } = require('../models')

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll({
            order: [['id', 'ASC']]
        })
        res.json(products)
    } catch (err) {
        next(err)
    }
}

async function getProductById(req, res, next) {
    try {
        const productId = req.params.id

        const product = await Product.findByPk(productId)
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' })
        }
        res.json(product)
    } catch (err) {
        next(err)
    }
}

async function getCategories(req, res, next) {
    try {
        const products = await Category.findAll({
            attributes: ['id_category', 'name', 'id_parent_category']
        })
        res.json(products)
    } catch (err) {
        next(err)
    }
}

async function getProductsByCategory(req, res, next) {
  try {
    const catID = req.params.categoryId
    console.log("!!!", catID)

    // базовая валидация
    if (!Number.isInteger(Number(catID))) {
      return res.status(400).json({ message: 'Некорректный ID категории' });
    }

    // проверяем, существует ли категория
    const category = await Category.findByPk(catID);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    console.log("!!!!", category)
    // получаем товары
    const products = await Product.findAll({
      where: { category_id: catID },
      attributes: [
        'id',
        'name',
        'price',
        'price_opt',
        'img_url',
        'description',
        'stock_quantity',
      ],
      order: [['id', 'ASC']],
    });

    return res.json({
      category: {
        id: category.id_category,
        name: category.name,
      },
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
}

module.exports = {
    getProducts,
    getProductById,
    getCategories,
    getProductsByCategory
}
