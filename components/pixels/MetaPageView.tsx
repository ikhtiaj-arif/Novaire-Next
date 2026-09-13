'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function MetaPageView() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // The initial PageView on a full page load is fired by the base code in
    // layout.tsx — skip this first render to avoid double-firing.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return null;
}