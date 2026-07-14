import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { portfolio } from '@/data/portfolio';

const scrollToForm = () => {
  window.location.href = '/#contacts';
};

const Portfolio = () => {
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
            <Link to="/portfolio" className="text-sm font-medium text-brand transition-colors">Проекты</Link>
            <a href="/#contacts" className="text-sm font-medium hover:text-brand transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-brand" />
              <span className="font-display font-bold text-sm">+7 (926) 895-96-06</span>
            </div>
            <Button onClick={scrollToForm} className="rounded-full bg-brand text-brand-dark font-semibold hover:opacity-90 hidden sm:flex">
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
          <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Портфолио</span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-3 max-w-2xl">
            Реализованные проекты на платформе 1С
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Автоматизация, интеграции и доработки для компаний из разных отраслей — от розницы до производства.
          </p>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="container mx-auto pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((p) => (
            <div key={p.title} className="group bg-white border border-black/5 rounded-2xl p-7 hover-lift">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand/20 to-brand-graphite/20 flex items-center justify-center">
                  <Icon name={p.icon} size={22} className="text-brand" />
                </div>
                <span className="bg-brand text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl mt-5">{p.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{p.text}</p>
              <ul className="mt-5 space-y-2">
                {p.results.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <Icon name="CheckCircle2" size={16} className="text-brand shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container mx-auto py-16 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Хотите похожий результат?</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">Расскажите о своей задаче — предложим оптимальное решение на платформе 1С.</p>
          <Button size="lg" onClick={scrollToForm} className="mt-8 rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90">
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
    </div>
  );
};

export default Portfolio;
