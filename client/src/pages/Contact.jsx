import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to send inquiry.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">Get In Touch</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">We'd Love to Hear From You</h1>
        <p className="text-stone-500 text-sm">
          Whether you have a question about an order, size guidance, or corporate inquiries, our client care team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Contact Details */}
        <div className="lg:col-span-5 space-y-8 bg-stone-900 text-white p-8 rounded-3xl shadow-xl">
          <h2 className="font-serif text-2xl font-bold">Client Care & HQ</h2>

          <ul className="space-y-6 text-sm text-stone-300">
            <li className="flex items-start gap-4">
              <MapPin className="text-amber-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-semibold text-white">Registered Office</div>
                <div className="text-stone-400">Greathora Headquarters, Hyderabad, India</div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Phone className="text-amber-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-semibold text-white">Customer Care Phone</div>
                <div className="text-stone-400">+91 9770305316</div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Mail className="text-amber-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-semibold text-white">Email Address</div>
                <div className="text-stone-400">support@greathora.com</div>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <Clock className="text-amber-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <div className="font-semibold text-white">Business Hours</div>
                <div className="text-stone-400">Monday – Sunday | 10:00 AM – 7:00 PM (IST)</div>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Interactive Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-stone-900">Message Received</h3>
              <p className="text-stone-600 text-sm max-w-sm mx-auto">
                Thank you for reaching out. A Greathora client specialist will respond within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                className="bg-stone-900 text-white px-6 py-2.5 rounded-lg text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">Send Us a Message</h2>

              {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">{error}</div>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold uppercase text-stone-600 block mb-1">Your Name *</label>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold uppercase text-stone-600 block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>

                <div>
                  <label className="font-semibold uppercase text-stone-600 block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Order inquiry / Size advice"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold uppercase text-stone-600 block mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we assist you today?"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-amber-700 transition-colors shadow-lg shadow-stone-900/10"
              >
                <Send size={16} />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
