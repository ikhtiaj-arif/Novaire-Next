import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Merci pour votre confiance | NOVAIRE',
  description:
    'Votre commande Novaire a bien été enregistrée. Notre équipe vous contactera sous 24h.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden bg-background text-foreground">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse, rgba(201,168,76,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <div className="rounded-3xl border border-gold/25 bg-card p-8 sm:p-12 shadow-2xl animate-scale-in">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-gold/30 bg-gold/10 shadow-lg animate-gold-glow">
            <CheckCircle2 className="h-12 w-12 text-gold" aria-hidden="true" />
          </div>

          <h1
            id="thankyou-heading"
            className="font-heading text-2xl sm:text-3xl font-bold text-gold leading-relaxed mb-6"
            dir="rtl"
          >
            شكراً لثقتكم في عطور NOVAIRE!
          </h1>

          <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />

          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-8">
            Merci pour votre confiance ! En raison d&apos;une demande
            exceptionnellement forte, notre premier lot d&apos;édition limitée est
            actuellement épuisé. Notre équipe vous contactera en priorité absolue
            par <span className="text-gold font-semibold">WhatsApp</span> dès
            l&apos;arrivée du prochain réapprovisionnement pour vous valider une
            remise exclusive.
          </p>

          <div className="inline-flex items-center justify-center gap-2 glass rounded-xl px-5 py-3 text-xs text-muted-foreground mb-8">
            <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
            <span>Contact WhatsApp prioritaire sous 24h</span>

          </div>

          <div>
            <Link
              href="/a"
              className="inline-flex items-center justify-center border border-gold/30 text-gold hover:bg-gold hover:text-black rounded-full px-8 py-3 text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300"
            >
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
