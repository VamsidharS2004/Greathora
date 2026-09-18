import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const primaryImage = product.images?.[0] || '/images/products/image1.jpeg';
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div className="group relative bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={product.name}
              className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.is_new === 1 && (
            <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              New
            </span>
          )}
          {product.is_sale === 1 && (
            <span className="bg-red-700 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-colors z-10 ${
            isWishlisted ? 'text-red-600' : 'text-stone-500 hover:text-stone-900'
          }`}
          title="Add to Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add To Cart Button */}
        <button
          onClick={() => addToCart(product, product.colors?.[0], product.sizes?.[0], 1)}
          className="absolute bottom-3 left-3 right-3 bg-stone-900/95 backdrop-blur-md text-white text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-amber-700"
        >
          <ShoppingBag size={14} />
          <span>Quick Add</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          <span className="text-[11px] text-stone-400 font-medium uppercase tracking-wider block">
            {product.category_name}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="font-medium text-stone-900 text-sm hover:text-amber-700 transition-colors line-clamp-1 block mt-0.5"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-900 text-sm">₹{product.price?.toLocaleString()}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-stone-400 line-through">₹{product.original_price.toLocaleString()}</span>
            )}
          </div>
          <div className="flex gap-1">
            {product.colors?.slice(0, 3).map((col, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{
                  backgroundColor:
                    col.toLowerCase() === 'white' ? '#fff' :
                    col.toLowerCase() === 'black' ? '#000' :
                    col.toLowerCase() === 'beige' ? '#f5f5dc' :
                    col.toLowerCase() === 'navy' ? '#000080' :
                    col.toLowerCase() === 'olive' ? '#808000' :
                    col.toLowerCase() === 'burgundy' ? '#800020' :
                    col.toLowerCase() === 'grey' ? '#808080' : '#d2b48c'
                }}
                title={col}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
