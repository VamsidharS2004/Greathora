import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, collections } = useShop();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filters State
  const selectedCategory = searchParams.get('category') || '';
  const selectedCollection = searchParams.get('collection') || '';
  const selectedOccasion = searchParams.get('occasion') || '';
  const selectedColor = searchParams.get('color') || '';
  const selectedSize = searchParams.get('size') || '';
  const isNew = searchParams.get('is_new') === 'true';
  const isSale = searchParams.get('is_sale') === 'true';
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || 'default';

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams(searchParams).toString();
    fetch(`/api/products?${query}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const colorsList = ['Black', 'White', 'Beige', 'Navy', 'Grey', 'Brown', 'Olive', 'Burgundy'];
  const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const occasionsList = ['Office Essentials', 'Business Casual', 'Business Formal', 'Boardroom Collection', 'Client Meeting', 'Office Party', 'Business Travel'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 capitalize">
            {selectedCategory ? `${selectedCategory.replace('-', ' ')} Collection` :
             selectedCollection ? selectedCollection.replace('-', ' ') :
             isNew ? 'New Arrivals' :
             isSale ? 'Exclusive Sale' :
             searchQuery ? `Search results for "${searchQuery}"` :
             'All Women\'s Wear'}
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            Showing {products.length} refined handcrafted products
          </p>
        </div>

        {/* Top Controls: Mobile Filter Button & Sort Selector */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-white border border-stone-300 text-stone-800 text-sm rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-amber-600 font-medium"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Desktop Left Sidebar Filter */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-2xl border border-stone-200">
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <Filter size={18} />
              <span>Filter By</span>
            </h3>
            {(selectedCategory || selectedCollection || selectedOccasion || selectedColor || selectedSize || isNew || isSale) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-amber-800 hover:text-amber-900 font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Categories</h4>
            <div className="space-y-1.5">
              <button
                onClick={() => updateFilter('category', '')}
                className={`text-sm block w-full text-left transition-colors ${!selectedCategory ? 'font-bold text-amber-800' : 'text-stone-600 hover:text-stone-900'}`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.slug)}
                  className={`text-sm block w-full text-left transition-colors ${selectedCategory === cat.slug ? 'font-bold text-amber-800' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Collections Filter */}
          <div className="space-y-3 border-t border-stone-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Collections</h4>
            <div className="space-y-1.5">
              {collections.map(col => (
                <button
                  key={col.id}
                  onClick={() => updateFilter('collection', selectedCollection === col.slug ? '' : col.slug)}
                  className={`text-sm block w-full text-left transition-colors ${selectedCollection === col.slug ? 'font-bold text-amber-800' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {col.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 border-t border-stone-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Color</h4>
            <div className="flex flex-wrap gap-2">
              {colorsList.map(color => (
                <button
                  key={color}
                  onClick={() => updateFilter('color', selectedColor === color ? '' : color)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedColor === color
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-3 border-t border-stone-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {sizesList.map(size => (
                <button
                  key={size}
                  onClick={() => updateFilter('size', selectedSize === size ? '' : size)}
                  className={`py-1.5 text-xs rounded-lg border text-center transition-colors ${
                    selectedSize === size
                      ? 'bg-stone-900 text-white border-stone-900 font-bold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion Filter */}
          <div className="space-y-3 border-t border-stone-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Shop By Occasion</h4>
            <div className="space-y-1.5">
              {occasionsList.map(occ => (
                <button
                  key={occ}
                  onClick={() => updateFilter('occasion', selectedOccasion === occ ? '' : occ)}
                  className={`text-sm block w-full text-left transition-colors ${selectedOccasion === occ ? 'font-bold text-amber-800' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-stone-200 h-96 rounded-xl" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
              <p className="text-stone-600 font-medium">No products matched your selected filters.</p>
              <button
                onClick={clearAllFilters}
                className="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-white p-6 overflow-y-auto space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="font-serif font-bold text-stone-900 text-lg">Filter Products</h3>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="text-stone-500 p-1"><X size={20} /></button>
              </div>

              {/* Mobile Filter Sections */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase text-stone-400">Categories</h4>
                <div className="space-y-2">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => { updateFilter('category', c.slug); setIsFilterDrawerOpen(false); }}
                      className={`block text-sm text-left ${selectedCategory === c.slug ? 'font-bold text-amber-800' : 'text-stone-700'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h4 className="text-xs font-bold uppercase text-stone-400">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colorsList.map(col => (
                    <button
                      key={col}
                      onClick={() => { updateFilter('color', selectedColor === col ? '' : col); setIsFilterDrawerOpen(false); }}
                      className={`px-3 py-1 text-xs rounded-full border ${selectedColor === col ? 'bg-stone-900 text-white' : 'bg-stone-100'}`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { clearAllFilters(); setIsFilterDrawerOpen(false); }}
                className="w-full bg-stone-900 text-white py-3 rounded-lg text-sm font-medium mt-6"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
