import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl font-bold tracking-widest text-white">GREATHORA</span>
          </Link>
          <p className="text-stone-400 text-sm leading-relaxed max-w-md">
            Every Woman Has a Story. Dress for Yours. We craft premium office wear and contemporary fashion celebrating strength, sophistication, and timeless elegance.
          </p>
          <div className="pt-2 flex items-center space-x-4 text-stone-400">
            <a href="#" className="hover:text-amber-400 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-amber-400 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-amber-400 transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-white font-semibold text-base mb-4 tracking-wider uppercase">Shop</h3>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/shop?is_new=true" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop?category=blazers" className="hover:text-white transition-colors">Blazers & Suits</Link></li>
            <li><Link to="/shop?category=shirts" className="hover:text-white transition-colors">Formal Shirts</Link></li>
            <li><Link to="/shop?category=trousers" className="hover:text-white transition-colors">Tailored Trousers</Link></li>
            <li><Link to="/shop?category=dresses" className="hover:text-white transition-colors">Executive Dresses</Link></li>
            <li><Link to="/shop?collection=ceo-collection" className="hover:text-white transition-colors">CEO Collection</Link></li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h3 className="font-serif text-white font-semibold text-base mb-4 tracking-wider uppercase">Customer Care</h3>
          <ul className="space-y-2.5 text-sm text-stone-400">
            <li><Link to="/policy?tab=returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/policy?tab=privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Greathora</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><Link to="/account" className="hover:text-white transition-colors">Track Your Order</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-serif text-white font-semibold text-base mb-4 tracking-wider uppercase">Registered Office</h3>
          <ul className="space-y-3 text-sm text-stone-400">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Greathora HQ, Hyderabad, India</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-amber-400 flex-shrink-0" />
              <span>+91 9770305316</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-amber-400 flex-shrink-0" />
              <span>support@greathora.com</span>
            </li>
            <li className="text-xs text-stone-500 pt-1">
              Business Hours: Mon – Sun<br />10:00 AM – 7:00 PM (IST)
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
        <div>&copy; {new Date().getFullYear()} Greathora. All rights reserved. Designed for timeless elegance.</div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <span>100% Secure Checkout</span>
          <span>•</span>
          <span>UPI / Cards / COD</span>
        </div>
      </div>
    </footer>
  );
}
