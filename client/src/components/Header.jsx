import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const { cartCount, wishlist, user, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen, setIsSearchOpen, categories, collections } = useShop();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <span>Complimentary Express Shipping Across India</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline text-amber-400 font-medium">Every Woman Has a Story. Dress for Yours.</span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Mobile Menu Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Brand Logo */}
        <div className="flex-1 text-center lg:flex-initial lg:text-left">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-stone-900">GREATHORA</span>
            <span className="block text-[9px] tracking-[0.3em] uppercase text-stone-500 font-sans text-center lg:text-left">Couture & Executive Wear</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide text-stone-800">
          <Link to="/" className="hover:text-amber-700 transition-colors py-2">Home</Link>
          <Link to="/shop?is_new=true" className="hover:text-amber-700 transition-colors py-2 text-amber-800 font-semibold">New Arrivals</Link>

          {/* Categories Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('shop')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link to="/shop" className="hover:text-amber-700 transition-colors flex items-center gap-1">
              Shop <ChevronDown size={14} />
            </Link>

            {activeDropdown === 'shop' && (
              <div className="absolute top-full left-0 w-80 bg-white border border-stone-200 shadow-xl rounded-b-lg p-6 grid grid-cols-2 gap-4 z-50">
                {categories.map(cat => (
                  <div key={cat.id}>
                    <Link
                      to={`/shop?category=${cat.slug}`}
                      className="font-semibold text-stone-900 hover:text-amber-700 block mb-1"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {cat.name}
                    </Link>
                    <div className="space-y-1">
                      {cat.subcategories?.slice(0, 3).map((sub, idx) => (
                        <Link
                          key={idx}
                          to={`/shop?category=${cat.slug}&search=${sub}`}
                          className="text-xs text-stone-500 hover:text-stone-900 block"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collections Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown('collections')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-amber-700 transition-colors flex items-center gap-1">
              Collections <ChevronDown size={14} />
            </button>

            {activeDropdown === 'collections' && (
              <div className="absolute top-full left-0 w-64 bg-white border border-stone-200 shadow-xl rounded-b-lg p-5 space-y-3 z-50">
                {collections.map(col => (
                  <Link
                    key={col.id}
                    to={`/shop?collection=${col.slug}`}
                    className="block text-sm text-stone-700 hover:text-amber-700 hover:translate-x-1 transition-all"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <div className="font-medium">{col.name}</div>
                    <div className="text-[11px] text-stone-400 font-light truncate">{col.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-amber-700 transition-colors py-2">About Us</Link>
          <Link to="/contact" className="hover:text-amber-700 transition-colors py-2">Contact</Link>
          <Link to="/shop?is_sale=true" className="text-red-700 hover:text-red-800 font-semibold py-2">Sale</Link>
        </nav>

        {/* Right Utility Icons */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-stone-700">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:text-stone-900 transition-colors"
            title="Search"
          >
            <Search size={20} />
          </button>

          <Link to="/account" className="p-2 hover:text-stone-900 transition-colors hidden sm:block" title="Account">
            <User size={20} />
          </Link>

          <Link to="/shop" className="p-2 hover:text-stone-900 transition-colors relative" title="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:text-stone-900 transition-colors relative flex items-center"
            title="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 font-medium text-stone-800">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Home</Link>
            <Link to="/shop?is_new=true" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-100 text-amber-800 font-semibold">New Arrivals</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-100">All Products</Link>

            <div className="py-2 border-b border-stone-100">
              <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider">Categories</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map(c => (
                  <Link
                    key={c.id}
                    to={`/shop?category=${c.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-stone-600 hover:text-amber-800 py-1"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2 border-b border-stone-100">
              <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider">Collections</span>
              <div className="grid grid-cols-1 gap-1.5 mt-2">
                {collections.map(col => (
                  <Link
                    key={col.id}
                    to={`/shop?collection=${col.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-stone-600 hover:text-amber-800 py-0.5"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-100">About Greathora</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Contact Us</Link>
            <Link to="/policy" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-stone-100">Returns & Privacy Policy</Link>
            <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-stone-900 font-semibold flex items-center gap-2">
              <User size={18} /> {user ? user.name : 'Sign In / Register'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
