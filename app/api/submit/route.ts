import { NextResponse } from 'next/server';
import { validateOrder } from '@/lib/validation';

export const runtime = 'nodejs';

interface LeadPayload {
  name?: unknown;
  phone?: unknown;
  city?: unknown;
  scent?: unknown;
  quantity?: unknown;
  variant?: unknown;
  price?: unknown;
  totalPrice?: unknown;
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

    // Server-side validation — never trust the client (shared validation.ts)
    const errors = validateOrder({ name, phone, city, scent });
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    // Timestamp generated server-side only
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