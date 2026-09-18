import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-2 rounded-full"
        >
          <X size={24} />
        </button>

        <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">Search Greathora</h3>

        <form onSubmit={handleSearch} className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blazers, shirts, CEO collection..."
            className="w-full bg-stone-50 border border-stone-300 rounded-xl py-3.5 pl-12 pr-12 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-600 font-medium"
            autoFocus
          />
          <Search size={20} className="absolute left-4 top-4 text-stone-400" />
          <button
            type="submit"
            className="absolute right-3 top-2.5 bg-stone-900 text-white p-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="border-t border-stone-100 pt-4">
          <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider block mb-2">Popular Searches</span>
          <div className="flex flex-wrap gap-2">
            {['Power Blazer', 'CEO Collection', 'Classic White Shirt', 'Wide Leg Trousers', 'Co-Ord Sets', 'Outerwear'].map((term, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate(`/shop?search=${encodeURIComponent(term)}`);
                }}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
