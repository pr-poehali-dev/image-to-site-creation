import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { clients } from '@/data/clients';
import LeadFormModal from '@/components/LeadFormModal';

const Clients = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-brand-dark font-sans overflow-x-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass border-b border-black/5">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-xl tracking-tight">
              PRO<span className="text-brand">ximum</span>
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide">Цифровизация вашего бизнеса</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            <Link to="/" className="text-sm font-medium hover:text-brand transition-colors">Главная</Link>
            <Link to="/portfolio" className="text-sm font-medium hover:text-brand transition-colors">Проекты</Link>
            <Link to="/clients" className="text-sm font-medium text-brand transition-colors">Клиенты</Link>
            <a href="/#contacts" className="text-sm font-medium hover:text-brand transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-brand" />
              <span className="font-display font-bold text-sm">+7 (926) 895-96-06</span>
            </div>
            <Button onClick={() => setFormOpen(true)} className="rounded-full bg-brand text-brand-dark font-semibold hover:opacity-90 hidden sm:flex">
              Обсудить проект
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid-pattern">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-brand/15 via-brand/5 to-transparent blur-3xl" />
        <div className="container mx-auto relative py-16 lg:py-20">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand transition-colors mb-6">
            <Icon name="ArrowLeft" size={16} /> На главную
          </Link>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-3 max-w-2xl">
            Нам доверяют следующие компании
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Мы гордимся долгосрочными отношениями с нашими клиентами и решениями, которые помогают их бизнесу расти.
          </p>
        </div>
      </section>

      {/* CLIENTS GRID */}
      <section className="container mx-auto pb-20">
        {clients.length === 0 ? (
          <div className="bg-muted/40 border border-dashed border-black/10 rounded-3xl p-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-graphite/20 flex items-center justify-center mx-auto">
              <Icon name="Building2" size={26} className="text-brand" />
            </div>
            <h3 className="font-display font-bold text-xl mt-5">Список клиентов скоро появится</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Мы готовим карточки с логотипами компаний, кратким описанием и программами на базе 1С, которые мы для них дорабатывали.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((c) => (
              <div key={c.name} className="group bg-white border border-black/5 rounded-2xl p-7 hover-lift">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className="h-10 object-contain" />
                ) : (
                  <div className="h-10 w-28 rounded-lg bg-muted/60 border border-dashed border-black/10 flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground font-medium">Нет логотипа</span>
                  </div>
                )}
                <span className="inline-block bg-brand text-brand-dark text-xs font-bold px-3 py-1 rounded-full mt-4">
                  {c.industry}
                </span>
                <h3 className="font-display font-bold text-xl mt-4">
                  {c.website ? (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors inline-flex items-center gap-1.5">
                      {c.name} <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                    </a>
                  ) : (
                    c.name
                  )}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">{c.description}</p>
                <ul className="mt-5 space-y-2">
                  {c.solutions.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm">
                      <Icon name="CheckCircle2" size={16} className="text-brand shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container mx-auto py-16 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Хотите стать нашим клиентом?</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">Расскажите о своей задаче — предложим оптимальное решение на платформе 1С.</p>
          <Button size="lg" onClick={() => setFormOpen(true)} className="mt-8 rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90">
            Обсудить проект <Icon name="ArrowRight" size={18} className="ml-1" />
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-graphite text-white/70">
        <div className="container mx-auto py-8 flex flex-col sm:flex-row justify-between gap-2 text-xs">
          <span>© 2026 PROximum. Все права защищены.</span>
          <Link to="/" className="hover:text-brand">На главную</Link>
        </div>
      </footer>

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

export default Clients;