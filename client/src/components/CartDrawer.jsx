import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-stone-800" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Your Shopping Bag ({cart.length})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-stone-300" />
                <p className="text-stone-500 font-medium">Your shopping bag is currently empty.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="inline-block bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-amber-700 transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 border-b border-stone-100 pb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded bg-stone-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-medium text-stone-900 text-sm hover:text-amber-700 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Color: {item.selectedColor} | Size: {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-semibold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-semibold text-stone-900 text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="flex justify-between text-stone-600 text-sm">
                <span>Shipping & Taxes</span>
                <span className="text-emerald-700 font-medium">Free Express Shipping</span>
              </div>
              <div className="flex justify-between text-stone-900 text-lg font-serif font-bold">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-stone-900 text-white py-3.5 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors shadow-lg shadow-stone-900/10"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
