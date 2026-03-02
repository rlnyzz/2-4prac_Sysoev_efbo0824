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

// Начальные данные (10 товаров)
let products = [
  { id: nanoid(6), name: 'Ноутбук ASUS ROG', category: 'Ноутбуки', description: 'Игровой ноутбук с RTX 4060, 16GB RAM', price: 120000, stock: 5 },
  { id: nanoid(6), name: 'Смартфон iPhone 15', category: 'Смартфоны', description: '128GB, черный, A16 Bionic', price: 89990, stock: 8 },
  { id: nanoid(6), name: 'Наушники Sony WH-1000XM5', category: 'Аудио', description: 'Беспроводные, шумоподавление', price: 29990, stock: 12 },
  { id: nanoid(6), name: 'Планшет Samsung Tab S9', category: 'Планшеты', description: '11" AMOLED, 256GB', price: 69990, stock: 3 },
  { id: nanoid(6), name: 'Монитор LG 27" 4K', category: 'Мониторы', description: 'IPS, HDR10, USB-C', price: 34990, stock: 7 },
  { id: nanoid(6), name: 'Клавиатура Logitech MX', category: 'Аксессуары', description: 'Механическая, беспроводная', price: 12990, stock: 15 },
  { id: nanoid(6), name: 'Мышь Razer DeathAdder', category: 'Аксессуары', description: 'Оптическая, 16000 DPI', price: 4990, stock: 20 },
  { id: nanoid(6), name: 'Внешний SSD Samsung T7', category: 'Хранение', description: '1TB, USB 3.2', price: 8990, stock: 9 },
  { id: nanoid(6), name: 'Умные часы Galaxy Watch 6', category: 'Гаджеты', description: '44mm, GPS, Bluetooth', price: 24990, stock: 4 },
  { id: nanoid(6), name: 'Роутер TP-Link Archer', category: 'Сетевое', description: 'WiFi 6, гигабитный', price: 7990, stock: 6 }
];

// ===== МАРШРУТЫ =====

// GET /api/products - получить все товары
app.get('/api/products', (req, res) => {
  console.log('GET /api/products - возвращаем товары');
  res.json(products);
});

// GET /api/products/:id - получить товар по ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  res.json(product);
});

// POST /api/products - создать новый товар
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock } = req.body;
  
  const newProduct = {
    id: nanoid(6),
    name: name?.trim() || 'Без названия',
    category: category?.trim() || 'Без категории',
    description: description?.trim() || '',
    price: Number(price) || 0,
    stock: Number(stock) || 0
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PATCH /api/products/:id - обновить товар
app.patch('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  const { name, category, description, price, stock } = req.body;
  
  if (name) product.name = name.trim();
  if (category) product.category = category.trim();
  if (description) product.description = description.trim();
  if (price) product.price = Number(price);
  if (stock) product.stock = Number(stock);

  res.json(product);
});

// DELETE /api/products/:id - удалить товар
app.delete('/api/products/:id', (req, res) => {
  const exists = products.some(p => p.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log(`📦 Доступные маршруты:`);
  console.log(`   GET    /api/products`);
  console.log(`   GET    /api/products/:id`);
  console.log(`   POST   /api/products`);
  console.log(`   PATCH  /api/products/:id`);
  console.log(`   DELETE /api/products/:id`);
});