const METRIKA_ID = 101026698;
const STORAGE_KEY = 'cookie-consent';

export type CookieChoice = 'accepted' | 'declined' | null;

export const getCookieChoice = (): CookieChoice => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
};

export const saveCookieChoice = (choice: 'accepted' | 'declined') => {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    return;
  }
};

let loaded = false;

export const loadMetrika = () => {
  if (loaded) return;
  loaded = true;

  const w = window as unknown as Record<string, unknown> & { ym?: (...args: unknown[]) => void };
  w.ym =
    w.ym ||
    function (...args: unknown[]) {
      const fn = w.ym as unknown as { a?: unknown[] };
      (fn.a = fn.a || []).push(args);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);

  w.ym(METRIKA_ID, 'init', {
    trustedDomains: ['poehali.dev'],
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true,
  });
};
