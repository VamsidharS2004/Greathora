import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Policy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'returns';

  // Return request form state
  const [returnForm, setReturnForm] = useState({ order_number: '', email: '', type: 'Return', reason: '', details: '' });
  const [submitting, setSubmitting] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState('');

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setReturnSuccess('');

    try {
      const res = await fetch('/api/returns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(returnForm)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReturnSuccess(data.message);
        setReturnForm({ order_number: '', email: '', type: 'Return', reason: '', details: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Tab Controls */}
      <div className="flex justify-center bg-stone-100 p-1.5 rounded-2xl max-w-md mx-auto text-sm font-semibold">
        <button
          onClick={() => setSearchParams({ tab: 'returns' })}
          className={`flex-1 py-3 rounded-xl transition-all ${activeTab === 'returns' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
        >
          Returns & Exchanges
        </button>
        <button
          onClick={() => setSearchParams({ tab: 'privacy' })}
          className={`flex-1 py-3 rounded-xl transition-all ${activeTab === 'privacy' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
        >
          Privacy Policy
        </button>
      </div>

      {activeTab === 'returns' ? (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-8">
          <div className="border-b border-stone-100 pb-6">
            <h1 className="font-serif text-3xl font-bold text-stone-900">Returns, Exchanges & Refund Policy</h1>
            <p className="text-xs text-stone-400 mt-1">Last Updated: July 20, 2026</p>
          </div>

          {/* Policy Text */}
          <div className="space-y-6 text-stone-600 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif font-bold text-stone-900 text-base">1. Return Policy</h2>
              <p>We accept returns under the following conditions:</p>
              <ul className="list-disc pl-5 space-y-1 text-stone-500">
                <li>Returns can be requested within 7 days of receiving your order.</li>
                <li>The product must be unused, unwashed, unworn, and in its original condition.</li>
                <li>All original tags, labels, packaging, and invoices must be intact.</li>
                <li>Products showing signs of use, damage, stains, perfume, or alterations will not be eligible for return.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-stone-900 text-base">2. Exchange Policy</h2>
              <p>Need a different size or color? We've got you covered.</p>
              <ul className="list-disc pl-5 space-y-1 text-stone-500">
                <li>Exchanges can be requested within 7 days of delivery.</li>
                <li>Exchanges are subject to product availability.</li>
                <li>Each order is eligible for one exchange only.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif font-bold text-stone-900 text-base">3. Refund Policy & Timelines</h2>
              <ul className="list-disc pl-5 space-y-1 text-stone-500">
                <li>Online Payments (UPI, Cards, Wallets): Processed within 5–7 business days to original payment method.</li>
                <li>Cash on Delivery (COD): Processed via bank transfer or store credit within 7–10 business days after verification.</li>
              </ul>
            </section>
          </div>

          {/* Interactive Return Submission Portal */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg flex items-center gap-2">
              <RefreshCw size={20} className="text-amber-700" />
              <span>Submit a Return or Exchange Request</span>
            </h3>

            {returnSuccess ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-xs flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 size={18} />
                <span>{returnSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleReturnSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Order Number (e.g. GH-10293)"
                    value={returnForm.order_number}
                    onChange={(e) => setReturnForm({ ...returnForm, order_number: e.target.value })}
                    className="bg-white border border-stone-300 p-2.5 rounded-lg text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={returnForm.email}
                    onChange={(e) => setReturnForm({ ...returnForm, email: e.target.value })}
                    className="bg-white border border-stone-300 p-2.5 rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={returnForm.type}
                    onChange={(e) => setReturnForm({ ...returnForm, type: e.target.value })}
                    className="bg-white border border-stone-300 p-2.5 rounded-lg text-sm font-medium"
                  >
                    <option value="Return">Request Return & Refund</option>
                    <option value="Exchange">Request Size / Color Exchange</option>
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="Reason (e.g. Size too small / Defect)"
                    value={returnForm.reason}
                    onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value })}
                    className="bg-white border border-stone-300 p-2.5 rounded-lg text-sm"
                  />
                </div>

                <textarea
                  placeholder="Additional details (optional)"
                  rows={3}
                  value={returnForm.details}
                  onChange={(e) => setReturnForm({ ...returnForm, details: e.target.value })}
                  className="w-full bg-white border border-stone-300 p-2.5 rounded-lg text-sm"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-stone-900 text-white px-6 py-2.5 rounded-lg font-medium text-xs hover:bg-amber-700 transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6 text-stone-600 text-sm leading-relaxed">
          <div className="border-b border-stone-100 pb-4">
            <h1 className="font-serif text-3xl font-bold text-stone-900">Privacy Policy</h1>
            <p className="text-xs text-stone-400 mt-1">Greathora Commitment to Customer Data Security</p>
          </div>

          <p>Welcome to Greathora. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your information.</p>

          <h2 className="font-serif font-bold text-stone-900 text-base">1. Information We Collect</h2>
          <p>We may collect Full Name, Email Address, Mobile Number, Shipping Address, Payment Details (processed securely), Order History, and Cookies.</p>

          <h2 className="font-serif font-bold text-stone-900 text-base">2. How We Use Your Information</h2>
          <p>We use your information to process and deliver orders, provide customer care, send real-time tracking updates, and improve website security.</p>

          <h2 className="font-serif font-bold text-stone-900 text-base">3. Payment Security</h2>
          <p>Greathora does not store your complete credit/debit card information. All online payments are processed through secure payment gateways using industry-standard 256-bit encryption.</p>
        </div>
      )}
    </div>
  );
}
