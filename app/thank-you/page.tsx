import Link from 'next/link';
import { CheckCircle2, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "NOVAIRE | Merci pour votre confiance",
  description: "Confirmation de votre demande de réservation Novaire.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[85vh] bg-[#0A0A0A] text-white flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 rounded-2xl border border-gold/30 bg-gradient-to-b from-[#141414] via-[#0F0F0F] to-[#0A0A0A] p-8 sm:p-12 shadow-2xl backdrop-blur-md">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/30 shadow-lg shadow-gold/10">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        {/* Arabic Confirmation Header */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gold mb-6 dir-rtl leading-relaxed">
          شكراً لثقتكم في عطور NOVAIRE!
        </h1>

        {/* French Text */}
        <div className="rounded-xl border border-gold/20 bg-black/50 p-6 mb-8 text-left sm:text-center">
          <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
            Merci pour votre confiance ! En raison d'une demande exceptionnellement forte, notre premier lot d'édition limitée est actuellement épuisé. Notre équipe vous contactera en priorité absolue par WhatsApp dès l'arrivée du prochain réapprovisionnement pour vous valider une remise exclusive.
          </p>
        </div>

        {/* Info Badge */}
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 mb-8">
          <MessageCircle className="h-4 w-4 text-gold" />
          <span>Contact WhatsApp prioritaire sous 24h</span>
        </div>

        {/* Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold/10 border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold hover:text-black transition-all duration-300 uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
