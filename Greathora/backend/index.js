const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db, initDb } = require('./db');

initDb();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'greathora_secret_key_2026';

app.use(cors());
app.use(express.json());

// Serve static images from frontend public folder
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));

// Helper middleware for auth
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// 1. Get Categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories').all();
    const formatted = categories.map(c => ({
      ...c,
      subcategories: JSON.parse(c.subcategories || '[]')
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get Collections
app.get('/api/collections', (req, res) => {
  try {
    const collections = db.prepare('SELECT * FROM collections').all();
    res.json(collections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get Products (Filtered & Sorted)
app.get('/api/products', (req, res) => {
  try {
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug, col.name as collection_name, col.slug as collection_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN collections col ON p.collection_id = col.id
      WHERE 1=1
    `;
    const params = [];

    const { category, collection, occasion, color, size, is_new, is_bestseller, is_sale, min_price, max_price, search, sort } = req.query;

    if (category) {
      query += ` AND (c.slug = ? OR c.name = ?)`;
      params.push(category, category);
    }

    if (collection) {
      query += ` AND (col.slug = ? OR col.name = ?)`;
      params.push(collection, collection);
    }

    if (is_new === 'true' || is_new === '1') {
      query += ` AND p.is_new = 1`;
    }

    if (is_bestseller === 'true' || is_bestseller === '1') {
      query += ` AND p.is_bestseller = 1`;
    }

    if (is_sale === 'true' || is_sale === '1') {
      query += ` AND p.is_sale = 1`;
    }

    if (min_price) {
      query += ` AND p.price >= ?`;
      params.push(parseFloat(min_price));
    }

    if (max_price) {
      query += ` AND p.price <= ?`;
      params.push(parseFloat(max_price));
    }

    if (search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ? OR col.name LIKE ?)`;
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    if (sort === 'price-low') {
      query += ` ORDER BY p.price ASC`;
    } else if (sort === 'price-high') {
      query += ` ORDER BY p.price DESC`;
    } else if (sort === 'newest') {
      query += ` ORDER BY p.id DESC`;
    } else {
      query += ` ORDER BY p.id ASC`;
    }

    let products = db.prepare(query).all(...params);

    products = products.map(p => ({
      ...p,
      occasion: JSON.parse(p.occasion || '[]'),
      colors: JSON.parse(p.colors || '[]'),
      sizes: JSON.parse(p.sizes || '[]'),
      images: JSON.parse(p.images || '[]')
    }));

    if (color) {
      products = products.filter(p => p.colors.some(c => c.toLowerCase() === color.toLowerCase()));
    }

    if (size) {
      products = products.filter(p => p.sizes.includes(size.toUpperCase()));
    }

    if (occasion) {
      products = products.filter(p => p.occasion.some(o => o.toLowerCase() === occasion.toLowerCase()));
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Single Product
app.get('/api/products/:slug', (req, res) => {
  try {
    const product = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug, col.name as collection_name, col.slug as collection_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN collections col ON p.collection_id = col.id
      WHERE p.slug = ? OR p.id = ?
    `).get(req.params.slug, req.params.slug);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const formattedProduct = {
      ...product,
      occasion: JSON.parse(product.occasion || '[]'),
      colors: JSON.parse(product.colors || '[]'),
      sizes: JSON.parse(product.sizes || '[]'),
      images: JSON.parse(product.images || '[]')
    };

    let related = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ?
      LIMIT 4
    `).all(product.category_id, product.id);

    related = related.map(r => ({
      ...r,
      images: JSON.parse(r.images || '[]')
    }));

    res.json({ product: formattedProduct, related });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Auth Routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Account with this email already exists' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = db.prepare(`
      INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)
    `).run(name, email, hash, phone || '');

    const token = jwt.sign({ id: result.lastInsertRowid, email, name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.lastInsertRowid, name, email, phone } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Orders / Checkout
app.post('/api/orders', (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, shipping_address, payment_method, items, total_amount, user_id } = req.body;

    if (!customer_name || !customer_email || !shipping_address || !items || !items.length) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    const order_number = 'GH-' + Math.floor(100000 + Math.random() * 900000);

    const insertOrder = db.prepare(`
      INSERT INTO orders (order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertOrder.run(
      order_number,
      user_id || null,
      customer_name,
      customer_email,
      customer_phone || '',
      shipping_address,
      total_amount,
      payment_method || 'UPI / Online Card'
    );

    const orderId = result.lastInsertRowid;

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, color, size, price, quantity, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of items) {
      insertItem.run(
        orderId,
        item.product_id || null,
        item.name,
        item.color || '',
        item.size || '',
        item.price,
        item.quantity,
        item.image || ''
      );
    }

    res.json({
      success: true,
      order_number,
      message: 'Order placed successfully!'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Get Orders
app.get('/api/orders', (req, res) => {
  try {
    const { email, order_number } = req.query;
    let orders = [];

    if (order_number) {
      orders = db.prepare('SELECT * FROM orders WHERE order_number = ?').all(order_number);
    } else if (email) {
      orders = db.prepare('SELECT * FROM orders WHERE customer_email = ? ORDER BY id DESC').all(email);
    } else {
      orders = db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT 20').all();
    }

    const formatted = orders.map(o => {
      const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
      return { ...o, items };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Contact Form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    db.prepare(`
      INSERT INTO contacts (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone || '', subject || '', message);

    res.json({ success: true, message: 'Thank you for contacting Greathora. We will get back to you shortly.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Returns & Exchange Form
app.post('/api/returns', (req, res) => {
  try {
    const { order_number, email, type, reason, details } = req.body;
    if (!order_number || !email || !type || !reason) {
      return res.status(400).json({ error: 'Order number, email, type, and reason are required.' });
    }

    db.prepare(`
      INSERT INTO return_requests (order_number, email, type, reason, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(order_number, email, type, reason, details || '');

    res.json({ success: true, message: `Your ${type.toLowerCase()} request for order ${order_number} has been submitted.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Greathora API server running on port ${PORT}`);
});
