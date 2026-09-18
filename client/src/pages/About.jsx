import React from 'react';
import { Sparkles, Heart, Award, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <span className="text-amber-800 text-xs font-bold uppercase tracking-widest">Brand Narrative</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900">About Greathora</h1>
        <p className="font-serif italic text-xl text-stone-600 max-w-2xl mx-auto">
          "Every Woman Has a Story. Dress for Yours."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img src="/images/products/image1.jpeg" alt="Greathora Brand Story" className="w-full h-[480px] object-cover" />
        </div>

        <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
          <p>
            Some stories are spoken aloud. Others are quietly written through early mornings, endless responsibilities, ambitious dreams, silent sacrifices, and the courage to begin again every single day.
          </p>
          <p>
            She is a daughter who carries her family's hopes, a professional who leads with confidence, a friend who listens without judgment, a partner who stands beside others, and above all, a woman who never stops becoming a better version of herself.
          </p>
          <p className="font-medium text-stone-900">
            At Greathora, we believe clothing is more than fabric — it is a reflection of her journey.
          </p>
          <p>
            It is the confidence she wears into an important meeting, the comfort she finds during a long day, and the elegance that reminds her she deserves to feel extraordinary, every single day.
          </p>
        </div>
      </div>

      <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-3xl space-y-6 text-center">
        <Sparkles size={32} className="text-amber-400 mx-auto" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-stone-300 text-sm leading-relaxed font-light">
          To help every woman feel confident, powerful, and beautiful, wherever life takes her. Because true elegance is never defined by trends. It is defined by purpose, resilience, and authenticity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-2">
          <Award className="text-amber-700 mx-auto" size={28} />
          <h3 className="font-serif font-bold text-stone-900 text-base">Executive Tailoring</h3>
          <p className="text-xs text-stone-500">Sharp silhouettes designed specifically for high-impact leadership.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-2">
          <Heart className="text-amber-700 mx-auto" size={28} />
          <h3 className="font-serif font-bold text-stone-900 text-base">Crafted with Purpose</h3>
          <p className="text-xs text-stone-500">Every stitch celebrates female individuality and strength.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-2">
          <ShieldCheck className="text-amber-700 mx-auto" size={28} />
          <h3 className="font-serif font-bold text-stone-900 text-base">Luxurious Fabrics</h3>
          <p className="text-xs text-stone-500">Breathable cottons, silks, linens & cashmere touch knits.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-2">
          <Sparkles className="text-amber-700 mx-auto" size={28} />
          <h3 className="font-serif font-bold text-stone-900 text-base">Timeless Elegance</h3>
          <p className="text-xs text-stone-500">Versatile wardrobe staples designed beyond seasonal trends.</p>
        </div>
      </div>
    </div>
  );
}
