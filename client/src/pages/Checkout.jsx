import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'UPI / NetBanking'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold">Your bag is empty</h2>
        <p className="text-stone-500 text-sm">Add some executive styles to proceed with checkout.</p>
        <Link to="/shop" className="inline-block bg-stone-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address || !formData.pincode) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: shippingAddress,
          payment_method: formData.paymentMethod,
          total_amount: cartTotal,
          items: cart,
          user_id: user?.id || null
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        navigate(`/order-confirmation?orderNumber=${data.order_number}`);
      } else {
        setError(data.error || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-serif text-3xl font-bold text-stone-900 mb-8">Secure Express Checkout</h1>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-200 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Shipping & Payment Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact & Shipping */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <Truck size={20} className="text-amber-700" />
              <span>1. Shipping Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-stone-600 block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ananya Sharma"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-stone-600 block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ananya@example.com"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase text-stone-600 block mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold uppercase text-stone-600 block mb-1">Street Address / Door No. *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Flat 402, Royal Palms, Jubilee Hills"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-stone-600 block mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Hyderabad"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-stone-600 block mb-1">State & Pincode *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Telangana"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="500033"
                    className="w-28 bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <CreditCard size={20} className="text-amber-700" />
              <span>2. Payment Option</span>
            </h2>

            <div className="space-y-3">
              {[
                { id: 'UPI / NetBanking', title: 'UPI / GooglePay / PhonePe / Credit Card', desc: 'Encrypted instant checkout' },
                { id: 'Cash On Delivery', title: 'Cash on Delivery (COD)', desc: 'Pay when package arrives at your doorstep' }
              ].map(method => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === method.id ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleChange}
                      className="accent-amber-700"
                    />
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">{method.title}</div>
                      <div className="text-xs text-stone-500">{method.desc}</div>
                    </div>
                  </div>
                  <Lock size={16} className="text-stone-400" />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b pb-3">Order Summary</h2>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded bg-stone-100 flex-shrink-0" />
                  <div className="flex-1 text-xs space-y-0.5">
                    <div className="font-semibold text-stone-900 line-clamp-1">{item.name}</div>
                    <div className="text-stone-500">Color: {item.selectedColor} | Size: {item.selectedSize}</div>
                    <div className="text-stone-500">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-sm text-stone-900">₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-4 space-y-2 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="text-emerald-700 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold text-stone-900 border-t pt-3">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-stone-900/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>256-Bit SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
