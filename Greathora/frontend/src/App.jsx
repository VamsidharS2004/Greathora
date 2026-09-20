import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="min-h-screen flex flex-col justify-between bg-stone-50">
          <div>
            <Header />
            <CartDrawer />
            <SearchModal />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/account" element={<Account />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/policy" element={<Policy />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </ShopProvider>
    </BrowserRouter>
  );
}
