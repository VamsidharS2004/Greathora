const { db, initDb } = require('./db');
const bcrypt = require('bcryptjs');

initDb();

db.exec(`
  DELETE FROM order_items;
  DELETE FROM orders;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM collections;
  DELETE FROM users;
  DELETE FROM contacts;
  DELETE FROM return_requests;
`);

const insertCategory = db.prepare(`
  INSERT INTO categories (name, slug, subcategories) VALUES (?, ?, ?)
`);

const categoriesData = [
  { name: 'Blazers', slug: 'blazers', subcategories: ['Single Breasted', 'Double Breasted', 'Cropped', 'Longline', 'Oversized'] },
  { name: 'Shirts', slug: 'shirts', subcategories: ['Cotton Shirts', 'Satin Shirts', 'Linen Shirts', 'Classic White Shirts', 'Oversized Shirts'] },
  { name: 'Tops', slug: 'tops', subcategories: ['Formal Tops', 'Sleeveless Tops', 'High Neck Tops', 'Wrap Tops', 'Peplum Tops'] },
  { name: 'Trousers', slug: 'trousers', subcategories: ['Straight Fit', 'Wide Leg', 'Cigarette Pants', 'High Waist', 'Cropped Pants'] },
  { name: 'Dresses', slug: 'dresses', subcategories: ['Sheath Dresses', 'Shirt Dresses', 'Wrap Dresses', 'Midi Dresses'] },
  { name: 'Skirts', slug: 'skirts', subcategories: ['Pencil Skirts', 'A-Line Skirts', 'Pleated Skirts'] },
  { name: 'Co-Ord Sets', slug: 'co-ord-sets', subcategories: ['Blazer Sets', 'Vest Sets', 'Shirt Sets', 'Three-Piece Sets'] },
  { name: 'Knitwear', slug: 'knitwear', subcategories: ['Cardigans', 'Sweaters', 'Pullovers'] },
  { name: 'Outerwear', slug: 'outerwear', subcategories: ['Trench Coats', 'Long Coats', 'Jackets'] },
];

const categoryIds = {};
for (const cat of categoriesData) {
  const result = insertCategory.run(cat.name, cat.slug, JSON.stringify(cat.subcategories));
  categoryIds[cat.name] = result.lastInsertRowid;
}

const insertCollection = db.prepare(`
  INSERT INTO collections (name, slug, description) VALUES (?, ?, ?)
`);

const collectionsData = [
  { name: 'CEO Collection', slug: 'ceo-collection', description: 'Command authority and confidence with bespoke executive tailoring.' },
  { name: 'Executive Edit', slug: 'executive-edit', description: 'Sharp, sophisticated styles tailored for modern leadership.' },
  { name: 'Power Dressing', slug: 'power-dressing', description: 'Elevated power silhouettes for boardroom impact.' },
  { name: 'Office Essentials', slug: 'office-essentials', description: 'Versatile daily wardrobe foundations for seamless office style.' },
  { name: 'Business Casual', slug: 'business-casual', description: 'Refined yet comfortable attire for modern workplaces.' },
  { name: 'Capsule Wardrobe', slug: 'capsule-wardrobe', description: 'Timeless mix-and-match pieces designed for longevity.' },
  { name: 'Limited Edition', slug: 'limited-edition', description: 'Exclusive handcrafted drops with limited availability.' },
];

const collectionIds = {};
for (const col of collectionsData) {
  const result = insertCollection.run(col.name, col.slug, col.description);
  collectionIds[col.name] = result.lastInsertRowid;
}

const insertProduct = db.prepare(`
  INSERT INTO products (name, slug, category_id, collection_id, description, price, original_price, is_new, is_bestseller, is_sale, occasion, colors, sizes, images)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const allColors = ['Black', 'White', 'Beige', 'Navy', 'Grey', 'Brown', 'Olive', 'Burgundy'];
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const rawProducts = [
  {
    name: 'Monochrome Executive Blazer Set',
    category: 'Co-Ord Sets',
    collection: 'CEO Collection',
    price: 8999,
    original_price: 11999,
    is_new: 1,
    is_bestseller: 1,
    is_sale: 1,
    occasion: ['Boardroom Collection', 'Client Meeting'],
    colors: ['Black', 'White', 'Navy'],
    images: ['/images/products/image1.jpeg', '/images/products/image2.jpeg'],
    description: 'Impeccably tailored double-breasted blazer and trousers co-ord designed for command and sophistication.'
  },
  {
    name: 'Classic Ivory Crisp Cotton Shirt',
    category: 'Shirts',
    collection: 'Office Essentials',
    price: 3499,
    original_price: 4299,
    is_new: 0,
    is_bestseller: 1,
    is_sale: 0,
    occasion: ['Office Essentials', 'Business Casual'],
    colors: ['White', 'Beige'],
    images: ['/images/products/image3.jpeg', '/images/products/image4.jpeg'],
    description: '100% breathable premium cotton shirt with structured cuffs and hidden button placket.'
  },
  {
    name: 'A-Line Pleated Tailored Midi Dress',
    category: 'Dresses',
    collection: 'Executive Edit',
    price: 6499,
    original_price: 7999,
    is_new: 1,
    is_bestseller: 0,
    is_sale: 0,
    occasion: ['Client Meeting', 'Office Party'],
    colors: ['Navy', 'Burgundy', 'Black'],
    images: ['/images/products/image5.jpeg', '/images/products/image6.jpeg'],
    description: 'Graceful midi dress with tailored waist define structure and effortless pleat movement.'
  },
  {
    name: 'High-Waist Wide Leg Trousers',
    category: 'Trousers',
    collection: 'Power Dressing',
    price: 4299,
    original_price: 5499,
    is_new: 0,
    is_bestseller: 1,
    is_sale: 1,
    occasion: ['Office Essentials', 'Business Travel'],
    colors: ['Beige', 'Black', 'Grey', 'Olive'],
    images: ['/images/products/image7.jpeg', '/images/products/image8.jpeg'],
    description: 'Elongating wide-leg silhouette in crease-resistant bi-stretch tailored blend.'
  },
  {
    name: 'Single-Breasted Wool Blend Trench Coat',
    category: 'Outerwear',
    collection: 'Limited Edition',
    price: 12999,
    original_price: 15999,
    is_new: 1,
    is_bestseller: 0,
    is_sale: 0,
    occasion: ['Business Travel', 'Client Meeting'],
    colors: ['Beige', 'Brown'],
    images: ['/images/products/image9.jpeg', '/images/products/image10.jpeg'],
    description: 'Timeless outerwear piece featuring storm flap detail, horn buttons, and adjustable tie belt.'
  },
  {
    name: 'Power Structured Shoulder Blazer',
    category: 'Blazers',
    collection: 'Power Dressing',
    price: 7499,
    original_price: 9299,
    is_new: 1,
    is_bestseller: 1,
    is_sale: 0,
    occasion: ['Boardroom Collection', 'Client Meeting'],
    colors: ['Black', 'Navy', 'Grey'],
    images: ['/images/products/image13.jpeg', '/images/products/image14.jpeg'],
    description: 'Architectural sharp shoulders and slim contouring elevate this signature power blazer.'
  }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

for (const p of rawProducts) {
  const catId = categoryIds[p.category];
  const colId = collectionIds[p.collection];
  const slug = slugify(p.name);

  insertProduct.run(
    p.name,
    slug,
    catId,
    colId,
    p.description,
    p.price,
    p.original_price,
    p.is_new,
    p.is_bestseller,
    p.is_sale,
    JSON.stringify(p.occasion),
    JSON.stringify(p.colors),
    JSON.stringify(allSizes),
    JSON.stringify(p.images)
  );
}

const hash = bcrypt.hashSync('password123', 10);
const insertUser = db.prepare(`
  INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)
`);
insertUser.run('Ananya Sharma', 'ananya@example.com', hash, '+91 9876543210');

console.log('Seeded database successfully.');
