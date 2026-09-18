import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setFeaturedProducts(data.filter(p => p.is_bestseller).slice(0, 8));
        setNewArrivals(data.filter(p => p.is_new).slice(0, 8));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/images/products/image1.jpeg"
            alt="Greathora Couture Hero"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-500/30">
              New Season 2026 Collection
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
              Every Woman Has a Story. <br />
              <span className="italic font-light text-amber-200">Dress for Yours.</span>
            </h1>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Tailored office wear and contemporary luxury created for women who lead with confidence, purpose, and timeless grace.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/shop"
                className="bg-amber-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-amber-500 transition-colors flex items-center gap-2 shadow-lg shadow-amber-600/20"
              >
                <span>Explore Shop</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/shop?collection=ceo-collection"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                CEO Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Value Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <Truck size={24} />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">Complimentary Shipping</h3>
          <p className="text-stone-500 text-sm leading-relaxed">Free express delivery across India on all luxury orders with real-time tracking.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={24} />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">Exquisite Tailoring</h3>
          <p className="text-stone-500 text-sm leading-relaxed">Thoughtfully crafted silhouettes made from breathable cottons, silks, and wool blends.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw size={24} />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">7-Day Hassle-Free Returns</h3>
          <p className="text-stone-500 text-sm leading-relaxed">Easy size exchanges and smooth returns to guarantee your confidence and fit.</p>
        </div>
      </section>

      {/* Featured Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 pb-4">
          <div>
            <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">Iconic Essentials</span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">Bestselling Executive Styles</h2>
          </div>
          <Link to="/shop" className="text-stone-900 font-medium text-sm hover:text-amber-700 flex items-center gap-1 transition-colors">
            <span>View All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-stone-200 h-80 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Collections Highlight Banner */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-stone-900">Curated Collections</h2>
            <p className="text-stone-500 text-sm mt-2">Designed for every chapter of your ambitious journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/shop?collection=ceo-collection" className="group relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/products/image19.jpeg" alt="CEO Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">Signature Line</span>
                <h3 className="font-serif text-2xl font-bold mt-1">CEO Collection</h3>
                <p className="text-xs text-stone-300 mt-1">Command authority with sharp executive tailoring.</p>
              </div>
            </Link>

            <Link to="/shop?collection=power-dressing" className="group relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/products/image13.jpeg" alt="Power Dressing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">Boardroom Ready</span>
                <h3 className="font-serif text-2xl font-bold mt-1">Power Dressing</h3>
                <p className="text-xs text-stone-300 mt-1">Architectural blazers and structured silhouettes.</p>
              </div>
            </Link>

            <Link to="/shop?collection=business-casual" className="group relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <img src="/images/products/image22.jpeg" alt="Business Casual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-medium">Modern Versatility</span>
                <h3 className="font-serif text-2xl font-bold mt-1">Business Casual</h3>
                <p className="text-xs text-stone-300 mt-1">Refined linen shirts, soft knits & drape trousers.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <img src="/images/products/image5.jpeg" alt="Greathora Women Story" className="w-full h-[500px] object-cover" />
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-stone-200">
            <Sparkles className="text-amber-600 mb-1" size={24} />
            <p className="font-serif text-xs font-bold text-stone-900 uppercase tracking-widest">Designed in Hyderabad</p>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">About Greathora</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
            Clothing is more than fabric — it is a reflection of her journey.
          </h2>
          <p className="text-stone-600 leading-relaxed">
            She is a daughter who carries her family's hopes, a professional who leads with confidence, a friend who listens without judgment, and above all, a woman who never stops becoming a better version of herself.
          </p>
          <p className="text-stone-600 leading-relaxed font-light">
            At Greathora, we create premium office wear and contemporary fashion for women who balance ambition with grace. True elegance is never defined by trends. It is defined by purpose, resilience, and authenticity.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-stone-900 font-semibold border-b-2 border-stone-900 pb-1 hover:text-amber-700 hover:border-amber-700 transition-colors"
          >
            <span>Read Our Full Story</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Client Testimonials</span>
            <h2 className="font-serif text-3xl font-bold">Trusted by Leaders & Visionaries</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-stone-800/80 p-8 rounded-2xl border border-stone-700/60 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed italic">
                "The fit of the CEO Collection blazer set is unmatched. I wore it for my seed funding pitch and felt completely in my element."
              </p>
              <div>
                <div className="font-semibold text-white text-sm">Priyanka V.</div>
                <div className="text-xs text-stone-400">Tech Founder, Bengaluru</div>
              </div>
            </div>

            <div className="bg-stone-800/80 p-8 rounded-2xl border border-stone-700/60 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed italic">
                "Greathora shirts are hands down the best cotton formal shirts I have owned. Breathable, sharp, and zero creasing during back-to-back client meetings."
              </p>
              <div>
                <div className="font-semibold text-white text-sm">Radhika S.</div>
                <div className="text-xs text-stone-400">Partner, Financial Advisory</div>
              </div>
            </div>

            <div className="bg-stone-800/80 p-8 rounded-2xl border border-stone-700/60 space-y-4">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-stone-300 text-sm leading-relaxed italic">
                "The attention to detail, fast delivery, and premium packaging made buying from Greathora an absolute pleasure."
              </p>
              <div>
                <div className="font-semibold text-white text-sm">Meera K.</div>
                <div className="text-xs text-stone-400">Marketing Director, Mumbai</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
