import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { legal } from '@/data/legal';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

const LegalLayout = ({ title, children }: LegalLayoutProps) => (
  <div className="min-h-screen bg-background text-brand-dark font-sans">
    <header className="border-b border-black/5 bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="font-display font-extrabold text-xl tracking-tight">
          PRO<span className="text-brand">ximum</span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand transition-colors">
          <Icon name="ArrowLeft" size={16} /> На главную
        </Link>
      </div>
    </header>

    <main className="container mx-auto py-12 max-w-3xl">
      <h1 className="font-display font-extrabold text-3xl md:text-4xl">{title}</h1>
      <p className="text-sm text-muted-foreground mt-3">Редакция от {legal.updated}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_a]:text-brand-dark [&_a]:underline">
        {children}
      </div>
    </main>

    <footer className="border-t border-black/5 bg-white">
      <div className="container mx-auto py-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 justify-between">
        <span>{legal.owner} · ИНН {legal.inn} · ОГРНИП {legal.ogrnip}</span>
        <span className="flex gap-4">
          <Link to="/privacy" className="hover:text-brand">Политика конфиденциальности</Link>
          <Link to="/consent" className="hover:text-brand">Согласие на обработку данных</Link>
        </span>
      </div>
    </footer>
  </div>
);

export default LegalLayout;
