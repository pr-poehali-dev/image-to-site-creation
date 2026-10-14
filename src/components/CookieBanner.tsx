import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCookieChoice, saveCookieChoice, loadMetrika } from '@/lib/analytics';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = getCookieChoice();
    if (choice === 'accepted') loadMetrika();
    if (choice === null) setVisible(true);
  }, []);

  const accept = () => {
    saveCookieChoice('accepted');
    loadMetrika();
    setVisible(false);
  };

  const decline = () => {
    saveCookieChoice('declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-24 sm:right-auto sm:max-w-md z-[70] bg-brand-dark text-white rounded-2xl p-5 shadow-2xl border border-white/10 animate-fade-in">
      <p className="text-sm leading-snug text-white/80">
        Мы используем cookie и сервис аналитики «Яндекс.Метрика», чтобы сайт работал лучше. Подробности в{' '}
        <Link to="/privacy" className="text-brand underline">
          политике конфиденциальности
        </Link>
        .
      </p>
      <div className="flex gap-3 mt-4">
        <Button onClick={accept} className="flex-1 rounded-full bg-brand text-brand-dark font-semibold hover:opacity-90">
          Принять
        </Button>
        <Button
          onClick={decline}
          variant="outline"
          className="flex-1 rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
        >
          Отклонить
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
