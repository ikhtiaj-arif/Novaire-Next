'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FRAGRANCES, MOROCCAN_CITIES } from '@/lib/constants';
import { trackConfirmOrder } from '@/lib/pixels';
import { ShieldCheck, Truck, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface CheckoutFormProps {
  variant: string;
  price: number;
  selectedScentName?: string;
  selectedQuantity?: number;
}

export function CheckoutForm({
  variant,
  price,
  selectedScentName,
  selectedQuantity = 1,
}: CheckoutFormProps) {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [scent, setScent] = useState(selectedScentName || FRAGRANCES[0].fullName);
  const [quantity, setQuantity] = useState(selectedQuantity);
  
  const [errors, setErrors] = useState<{ name?: string; phone?: string; city?: string; scent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync selected scent & quantity when updated from parent
  useEffect(() => {
    if (selectedScentName) {
      setScent(selectedScentName);
    }
  }, [selectedScentName]);

  useEffect(() => {
    if (selectedQuantity) {
      setQuantity(selectedQuantity);
    }
  }, [selectedQuantity]);

  const validatePhone = (inputPhone: string) => {
    const cleaned = inputPhone.trim().replace(/\s+/g, '');
    const phoneRegex = /^(\+212|06|07)[0-9]{8}$/;
    return phoneRegex.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Veuillez saisir votre nom complet / الرجاء إدخال الاسم الكامل';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Veuillez saisir votre numéro de téléphone / الرجاء إدخال رقم الهاتف';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Numéro invalide (Ex: 0612345678, 0712345678, +212612345678)';
    }

    if (!city) {
      newErrors.city = 'Veuillez sélectionner votre ville / الرجاء اختيار المدينة';
    }

    if (!scent) {
      newErrors.scent = 'Veuillez choisir une fragrance / الرجاء اختيار العطر';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        city,
        scent,
        variant,
        quantity,
        price,
        totalPrice: price * quantity,
        timestamp: new Date().toISOString(),
      };

      // 1. Send data to API endpoint
      await axios.post('/api/submit', payload);

      // 2. Fire Meta and TikTok pixel events
      trackConfirmOrder({
        scent,
        variant,
        price: price * quantity,
        quantity,
      });

      // 3. Redirect to thank-you page
      router.push('/thank-you');
    } catch (err) {
      console.error('Submission error:', err);
      // Even if fallback fails, track and redirect to thank-you page for lead UX
      trackConfirmOrder({
        scent,
        variant,
        price: price * quantity,
        quantity,
      });
      router.push('/thank-you');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="checkout-form" className="py-16 bg-[#080808] relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gold/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
        <div className="rounded-2xl border border-gold/30 bg-gradient-to-b from-[#141414] via-[#0F0F0F] to-[#0A0A0A] p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          
          {/* Header */}
          <div className="text-center mb-8 border-b border-gold/10 pb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full mb-3 border border-gold/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Commande Express — Paiement à la Livraison</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Formulaire de Commande (COD)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Remplissez les informations ci-dessous. Aucun paiement par carte n'est requis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hidden Variant Field */}
            <input type="hidden" name="variant" value={variant} />

            {/* Selected Fragrance Summary */}
            <div className="rounded-xl border border-gold/20 bg-gold/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-gold font-semibold block mb-1">
                  Parfum Sélectionné / العطر المختار:
                </label>
                <select
                  value={scent}
                  onChange={(e) => setScent(e.target.value)}
                  className="w-full bg-black/80 text-white text-sm font-semibold rounded-lg border border-gold/30 p-2 focus:outline-none focus:border-gold"
                >
                  {FRAGRANCES.map((f) => (
                    <option key={f.id} value={f.fullName}>
                      {f.fullName} — {f.notes}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-right sm:self-end">
                <span className="text-xs text-gray-400 block">Total à payer (COD):</span>
                <span className="text-xl font-bold text-gold">{price * quantity} DH</span>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Nom Complet / الاسم الكامل <span className="text-gold">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Mohamed Alami"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-lg border bg-black/60 px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.name ? 'border-red-500 focus:border-red-500' : 'border-gold/20 focus:border-gold'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.name}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Téléphone / رقم الهاتف <span className="text-gold">*</span>
              </label>
              <input
                type="tel"
                placeholder="Ex: 0661234567 ou 0761234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full rounded-lg border bg-black/60 px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gold/20 focus:border-gold'
                }`}
              />
              <p className="mt-1 text-[11px] text-gray-400">Format accepté: 06XXXXXXXX, 07XXXXXXXX, +212XXXXXXXXX</p>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.phone}
                </p>
              )}
            </div>

            {/* City Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Ville / المدينة <span className="text-gold">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full rounded-lg border bg-black/60 px-4 py-3.5 text-sm text-white focus:outline-none transition-colors ${
                  errors.city ? 'border-red-500 focus:border-red-500' : 'border-gold/20 focus:border-gold'
                }`}
              >
                <option value="">-- Sélectionnez votre ville / اختر مدينتك --</option>
                {MOROCCAN_CITIES.map((c) => (
                  <option key={c} value={c} className="bg-black text-white">
                    {c}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.city}
                </p>
              )}
            </div>

            {/* CTA Submit Button with Animated Glow */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] py-4 px-6 text-center text-base sm:text-lg font-bold uppercase tracking-wider text-black shadow-xl shadow-gold/20 hover:shadow-gold/50 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 animate-pulse"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    Traitement en cours...
                  </span>
                ) : (
                  <span>تأكيد الطلب | CONFIRMER MA COMMANDE</span>
                )}
              </button>
            </div>

            {/* Guarantee info footer */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-gray-400 border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-gold" /> Livraison à domicile gratuite
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-gold" /> Paiement après inspection
              </span>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
