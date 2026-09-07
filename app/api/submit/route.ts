import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface LeadPayload {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  scent?: unknown;
  quantity?: unknown;
  variant?: unknown;
  price?: unknown;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const city = typeof body.city === 'string' ? body.city.trim() : '';
    const scent = typeof body.scent === 'string' ? body.scent.trim() : '';
    const quantity =
      typeof body.quantity === 'number' && body.quantity >= 1 ? body.quantity : 1;
    const variant =
      typeof body.variant === 'string' ? body.variant.toUpperCase() : '';
    const price = typeof body.price === 'number' ? body.price : 0;

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Nom requis (min 2 caractères)' },
        { status: 400 }
      );
    }
    if (!/^(\+212|06|07)[0-9]{8}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Numéro invalide (ex: 06XXXXXXXX)' },
        { status: 400 }
      );
    }
    if (!city) {
      return NextResponse.json(
        { success: false, error: 'Veuillez sélectionner une ville' },
        { status: 400 }
      );
    }
    if (!scent) {
      return NextResponse.json(
        { success: false, error: 'Parfum invalide' },
        { status: 400 }
      );
    }

    const leadData = {
      timestamp: new Date().toISOString(),
      name,
      phone,
      city,
      scent,
      quantity,
      variant,
      price,
      priceDH: price * quantity,
    };

    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
          signal: AbortSignal.timeout(5000),
        });
      } catch (webhookErr) {
        console.error('[Lead Capture] Webhook error:', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      data: leadData,
    });
  } catch (error) {
    console.error('[Lead Capture API Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}