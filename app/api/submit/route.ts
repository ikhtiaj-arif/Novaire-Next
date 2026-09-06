import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, scent, variant, quantity, price, totalPrice, timestamp } = body;

    // Basic Validation
    if (!name || !phone || !city || !scent) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formattedTimestamp = timestamp || new Date().toISOString();
    const finalPrice = totalPrice || (price && quantity ? price * quantity : price || 0);

    // Lead data formatted for Google Sheet / Webhook
    const leadData = {
      timestamp: formattedTimestamp,
      fullName: name,
      phone,
      city,
      scentSelected: scent,
      priceVariant: variant,
      priceDH: finalPrice,
    };

    console.log('[Lead Capture] New order received:', leadData);

    // If GOOGLE_SHEET_WEBHOOK_URL or ZAPIER_WEBHOOK_URL is configured, post to it
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || process.env.ZAPIER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await axios.post(webhookUrl, leadData, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        });
        console.log('[Lead Capture] Webhook triggered successfully.');
      } catch (webhookErr) {
        console.error('[Lead Capture] Webhook error:', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      data: leadData,
    });
  } catch (error: any) {
    console.error('[Lead Capture API Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
