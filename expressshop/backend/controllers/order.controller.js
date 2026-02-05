const { Order, User, Product } = require('../models')

async function createOrder(req, res) {
  try {
    const { user_id, product_ids } = req.body;
    console.log(user_id)

    // базовая валидация
    if (!user_id || !Array.isArray(product_ids) || product_ids.length === 0) {
      return res.status(400).json({
        message: 'user_id и product_ids обязательны',
      });
    }

    // проверка пользователя
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // проверка товаров
    const products = await Product.findAll({
      where: {
        id: product_ids,
      },
    });

    if (products.length !== product_ids.length) {
      return res.status(400).json({
        message: 'Один или несколько товаров не найдены',
      });
    }

    // создание заказа
    const order = await Order.create({
      user_id,
      product_ids,
      order_status: 'Создан',
    });

    return res.status(201).json({
      message: 'Заказ создан',
      order,
    });
  } catch (error) {
    console.error('createOrder error:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.findAll({
      attributes: [
        'order_id',
        'user_id',
        'order_status',
        'product_ids',
      ],
      order: [['order_id', 'DESC']],
    });

    return res.json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('getOrders error:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
}


module.exports = {
    getOrders,
    createOrder
}
