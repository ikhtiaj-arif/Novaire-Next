'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  // Demo form: swallow the submit so the page never reloads.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-sm text-foreground">
          Nom complet
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Votre nom"
          disabled={sent}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 disabled:opacity-60"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="text-sm text-foreground">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          placeholder="vous@email.com"
          disabled={sent}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 disabled:opacity-60"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Votre message..."
          disabled={sent}
          className="min-h-28 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 disabled:opacity-60"
        />
      </div>

      {sent ? (
        <p
          role="status"
          className="flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-3 text-sm font-medium text-gold"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          Formulaire de démonstration — aucun message envoyé
        </p>
      ) : (
        <>
          <button
            type="submit"
            className="focus-ring inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-gold/90 active:scale-100"
          >
            Envoyer
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Formulaire de démonstration — aucun message n&apos;est réellement
            envoyé.
          </p>
        </>
      )}
    </form>
  );
}