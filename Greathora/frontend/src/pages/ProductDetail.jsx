import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Shield, Truck, RefreshCw, Check, Star, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart, wishlist, toggleWishlist } = useShop();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.product) {
          setProduct(data.product);
          setRelated(data.related || []);
          setSelectedImage(data.product.images?.[0] || '');
          setSelectedColor(data.product.colors?.[0] || '');
          setSelectedSize(data.product.sizes?.[1] || 'S'); // default S or M
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Product Not Found</h2>
        <Link to="/shop" className="inline-block bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium">
          Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <Link to="/" className="hover:text-stone-900">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-stone-900">Shop</Link>
        <ChevronRight size={12} />
        <Link to={`/shop?category=${product.category_slug}`} className="hover:text-stone-900">{product.category_name}</Link>
        <ChevronRight size={12} />
        <span className="text-stone-900 truncate">{product.name}</span>
      </nav>

      {/* Main Product Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden shadow-lg border border-stone-200">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === img ? 'border-amber-600 shadow-md scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Info Details */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold block mb-1">
              {product.collection_name || product.category_name}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">{product.name}</h1>

            <div className="flex items-center gap-4 mt-3">
              <span className="text-2xl font-bold text-stone-900">₹{product.price?.toLocaleString()}</span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-base text-stone-400 line-through">₹{product.original_price.toLocaleString()}</span>
              )}
              {product.is_sale === 1 && (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                  Special Offer
                </span>
              )}
            </div>
          </div>

          <p className="text-stone-600 leading-relaxed font-light text-sm sm:text-base border-t border-b border-stone-100 py-4">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
              Color: <span className="font-normal text-stone-900">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors?.map(col => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all ${
                    selectedColor === col
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Size: <span className="font-normal text-stone-900">{selectedSize}</span>
              </label>
              <button onClick={() => setActiveTab('size')} className="text-xs text-amber-800 hover:underline font-semibold">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes?.map(sz => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-2.5 text-xs font-bold rounded-lg border transition-all text-center ${
                    selectedSize === sz
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 w-32 justify-between px-3 py-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-stone-600 hover:text-stone-900 font-bold px-2"
              >
                -
              </button>
              <span className="font-semibold text-stone-900 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-stone-600 hover:text-stone-900 font-bold px-2"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
              className="flex-1 bg-stone-900 text-white py-3.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors shadow-lg shadow-stone-900/10"
            >
              <ShoppingBag size={18} />
              <span>Add To Shopping Bag</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-lg border transition-colors ${
                isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'bg-stone-50 border-stone-300 text-stone-600 hover:text-stone-900'
              }`}
              title="Add to Wishlist"
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Value Assurances */}
          <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600 pt-4">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-amber-700 flex-shrink-0" />
              <span>Free Express Delivery Across India</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={16} className="text-amber-700 flex-shrink-0" />
              <span>7 Days Return & Size Exchange</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-amber-700 flex-shrink-0" />
              <span>100% Authentic Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion / Tabs Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex border-b border-stone-200 gap-8 overflow-x-auto text-sm font-semibold">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 transition-colors ${activeTab === 'description' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Fabric & Care
          </button>
          <button
            onClick={() => setActiveTab('size')}
            className={`pb-3 transition-colors ${activeTab === 'size' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Size Guide
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors ${activeTab === 'shipping' ? 'border-b-2 border-stone-900 text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Shipping & Returns
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="space-y-3 text-stone-600 text-sm leading-relaxed">
            <p>Crafted with premium crease-resistant fabric for maximum comfort and crisp executive silhouette during demanding workdays.</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-500">
              <li>Fabric: Premium Bi-Stretch / High-Grade Cotton Satin</li>
              <li>Care: Dry clean recommended or gentle hand wash in cold water</li>
              <li>Fit: Tailored contemporary executive fit</li>
            </ul>
          </div>
        )}

        {activeTab === 'size' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600 border border-stone-200 rounded-lg">
              <thead className="bg-stone-100 text-stone-900 font-bold uppercase">
                <tr>
                  <th className="p-3 border-b">Size</th>
                  <th className="p-3 border-b">Bust (in)</th>
                  <th className="p-3 border-b">Waist (in)</th>
                  <th className="p-3 border-b">Hip (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-3 font-bold">XS</td><td className="p-3">32 - 33</td><td className="p-3">25 - 26</td><td className="p-3">35 - 36</td></tr>
                <tr className="border-b bg-stone-50"><td className="p-3 font-bold">S</td><td className="p-3">34 - 35</td><td className="p-3">27 - 28</td><td className="p-3">37 - 38</td></tr>
                <tr className="border-b"><td className="p-3 font-bold">M</td><td className="p-3">36 - 37</td><td className="p-3">29 - 30</td><td className="p-3">39 - 40</td></tr>
                <tr className="border-b bg-stone-50"><td className="p-3 font-bold">L</td><td className="p-3">38 - 40</td><td className="p-3">31 - 33</td><td className="p-3">41 - 43</td></tr>
                <tr className="border-b"><td className="p-3 font-bold">XL</td><td className="p-3">41 - 43</td><td className="p-3">34 - 36</td><td className="p-3">44 - 46</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="text-stone-600 text-sm leading-relaxed space-y-2">
            <p>Orders are dispatched within 24 business hours. Express transit takes 2–4 business days across major cities in India.</p>
            <p>Returns or exchanges can be requested within 7 days of delivery. Refer to our Returns Policy for full details.</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="space-y-6 pt-8">
          <h2 className="font-serif text-2xl font-bold text-stone-900">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
