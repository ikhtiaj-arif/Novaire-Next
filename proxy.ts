import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VARIANTS = ['a', 'b', 'c'] as const;
const COOKIE_NAME = 'novaire_variant';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 100; // 100 days

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept the root path
  if (pathname !== '/') return NextResponse.next();

  // Check for existing cookie
  const existingVariant = request.cookies.get(COOKIE_NAME)?.value;

  if (
    existingVariant &&
    VARIANTS.includes(existingVariant as (typeof VARIANTS)[number])
  ) {
    // Already assigned — redirect to their locked variant
    const url = request.nextUrl.clone();
    url.pathname = `/${existingVariant}`;
    return NextResponse.redirect(url);
  }

  // New visitor — assign random variant
  const variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

  const url = request.nextUrl.clone();
  url.pathname = `/${variant}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(COOKIE_NAME, variant, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: false, // needs to be readable client-side for pixel events
    sameSite: 'lax',
    path: '/',
  });

  return response;
}

export const config = {
  matcher: ['/', '/a', '/b', '/c'],
};