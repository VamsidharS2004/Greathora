import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'GH-892104';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle size={48} />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-800">Order Confirmed</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">Thank You For Choosing Greathora</h1>
        <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
          Your order <span className="font-bold text-stone-900">#{orderNumber}</span> has been received and is currently being tailored and prepared for express shipment.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-stone-200 text-left max-w-md mx-auto space-y-4 shadow-sm">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
          <Package className="text-amber-700" size={24} />
          <div>
            <div className="font-bold text-stone-900 text-sm">Order Reference: #{orderNumber}</div>
            <div className="text-xs text-stone-500">A confirmation email has been sent to your email.</div>
          </div>
        </div>

        <div className="text-xs text-stone-600 space-y-2">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="font-bold text-emerald-700">Processing</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery:</span>
            <span className="font-medium text-stone-900">2 - 4 Business Days</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
          to="/account"
          className="bg-stone-900 text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors"
        >
          View Order History
        </Link>
        <Link
          to="/shop"
          className="bg-stone-100 text-stone-800 px-8 py-3.5 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
