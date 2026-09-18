import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { User, Package, LogOut, Lock, Mail, Phone, ShoppingBag } from 'lucide-react';

export default function Account() {
  const { user, loginUser, logoutUser } = useShop();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setOrdersLoading(true);
      fetch(`/api/orders?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setOrdersLoading(false);
        })
        .catch(err => {
          console.error(err);
          setOrdersLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLoginTab ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.token) {
        loginUser(data.user, data.token);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network connection error');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-stone-900 text-white rounded-full flex items-center justify-center font-serif text-2xl font-bold">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-stone-900">{user.name}</h1>
              <p className="text-xs text-stone-500 mt-0.5">{user.email} {user.phone && `• ${user.phone}`}</p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="text-xs font-semibold text-red-600 hover:text-red-800 border border-red-200 bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Order History */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Package size={24} className="text-amber-700" />
            <span>Your Order History</span>
          </h2>

          {ordersLoading ? (
            <div className="text-stone-500 text-sm py-8 text-center">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3">
              <ShoppingBag size={36} className="mx-auto text-stone-300" />
              <p className="text-stone-600 text-sm">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between border-b border-stone-100 pb-3 gap-2">
                    <div>
                      <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Order Number</span>
                      <div className="font-bold text-stone-900 text-base">#{order.order_number}</div>
                    </div>
                    <div>
                      <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Date & Status</span>
                      <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                        {order.created_at?.split(' ')[0]} • {order.status}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Total</span>
                      <div className="font-bold text-stone-900 text-base">₹{order.total_amount?.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.product_name} className="w-12 h-14 object-cover rounded bg-stone-100" />
                        <div className="flex-1 text-xs">
                          <div className="font-semibold text-stone-900">{item.product_name}</div>
                          <div className="text-stone-500">Color: {item.color} | Size: {item.size} | Qty: {item.quantity}</div>
                        </div>
                        <div className="font-semibold text-xs text-stone-900">₹{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xl space-y-6">
        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl font-bold text-stone-900">Welcome to Greathora</h1>
          <p className="text-stone-500 text-xs">Sign in or register to manage your orders</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => { setIsLoginTab(true); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg transition-colors ${isLoginTab ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLoginTab(false); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg transition-colors ${!isLoginTab ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4 text-xs">
          {!isLoginTab && (
            <div>
              <label className="font-semibold uppercase text-stone-600 block mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ananya Sharma"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>
          )}

          <div>
            <label className="font-semibold uppercase text-stone-600 block mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ananya@example.com"
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="font-semibold uppercase text-stone-600 block mb-1">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {!isLoginTab && (
            <div>
              <label className="font-semibold uppercase text-stone-600 block mb-1">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-amber-700 transition-colors shadow-md shadow-stone-900/10 mt-2"
          >
            {loading ? 'Please wait...' : isLoginTab ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
