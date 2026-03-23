const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Начальные данные (10 цифровых товаров)
let products = [
  { id: nanoid(6), name: 'Windows 11 Pro', category: 'ОС', description: 'Лицензионная операционная система', price: 4990, stock: 100, type: 'key' },
  { id: nanoid(6), name: 'Adobe Photoshop', category: 'Софт', description: 'Годовая подписка', price: 8990, stock: 50, type: 'subscription' },
  { id: nanoid(6), name: 'Cyberpunk 2077', category: 'Игры', description: 'Цифровая версия для PC', price: 2990, stock: 200, type: 'key' },
  { id: nanoid(6), name: 'Microsoft Office 365', category: 'Офис', description: 'Годовая подписка', price: 3990, stock: 75, type: 'subscription' },
  { id: nanoid(6), name: 'Spotify Premium', category: 'Музыка', description: '3 месяца подписки', price: 599, stock: 500, type: 'subscription' },
  { id: nanoid(6), name: 'Figma Professional', category: 'Дизайн', description: 'Месячная подписка', price: 1290, stock: 150, type: 'subscription' },
  { id: nanoid(6), name: 'Elden Ring', category: 'Игры', description: 'Steam ключ', price: 3490, stock: 120, type: 'key' },
  { id: nanoid(6), name: 'Discord Nitro', category: 'Сервисы', description: 'Годовая подписка', price: 4990, stock: 80, type: 'subscription' },
  { id: nanoid(6), name: 'WinRAR', category: 'Софт', description: 'Лицензия на 1 год', price: 890, stock: 300, type: 'key' },
  { id: nanoid(6), name: 'NordVPN', category: 'Безопасность', description: '2 года подписки', price: 5990, stock: 60, type: 'subscription' }
];

// ===== API МАРШРУТЫ =====

// GET все товары
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET товар по ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  res.json(product);
});

// POST создать товар
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock, type } = req.body;

  if (!name?.trim() || !category?.trim()) {
    return res.status(400).json({ error: 'Название и категория обязательны' });
  }

  const newProduct = {
    id: nanoid(6),
    name: name.trim(),
    category: category.trim(),
    description: description?.trim() || '',
    price: Number(price) || 0,
    stock: Number(stock) || 0,
    type: type || 'key'
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PATCH обновить товар
app.patch('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const { name, category, description, price, stock, type } = req.body;
  
  if (name !== undefined) product.name = name.trim();
  if (category !== undefined) product.category = category.trim();
  if (description !== undefined) product.description = description.trim();
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (type !== undefined) product.type = type;

  res.json(product);
});

// DELETE удалить товар
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  
  products.splice(index, 1);
  res.status(204).send();
});

// 404 для несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📦 Доступные маршруты:`);
  console.log(`   GET    /api/products`);
  console.log(`   GET    /api/products/:id`);
  console.log(`   POST   /api/products`);
  console.log(`   PATCH  /api/products/:id`);
  console.log(`   DELETE /api/products/:id`);
});