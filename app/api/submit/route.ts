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
    let webhook: 'delivered' | 'failed' = 'failed';
    let webhookError: string | null = null;

    if (!webhookUrl) {
      console.error(
        '[Lead Capture] ZAPIER_WEBHOOK_URL is not set — lead was NOT delivered'
      );
      webhookError = 'missing_env';
    } else {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'NovaireApp/1.0',
            },
            body: JSON.stringify(leadData),
            signal: AbortSignal.timeout(5000),
          });

          if (res.ok) {
            webhook = 'delivered';
            break;
          }

          console.error(
            `[Lead Capture] Webhook HTTP ${res.status} (attempt ${attempt}):`,
            await res.text().catch(() => '<no body>')
          );
          webhookError = `http_${res.status}`;

          const isClientError =
            res.status >= 400 && res.status < 500 && res.status !== 429;
          if (isClientError) break;
        } catch (webhookErr) {
          console.error(
            `[Lead Capture] Webhook error (attempt ${attempt}):`,
            webhookErr
          );
          webhookError =
            webhookErr instanceof Error ? webhookErr.name : 'fetch_error';
        }

        if (attempt === 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    // A lead that never reached Google Sheets cannot be acted on — surface the
    // failure so the customer retries instead of seeing a false confirmation.
    if (webhook !== 'delivered') {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead delivery failed',
          webhook,
          webhookError,
          data: leadData,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      webhook,
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
