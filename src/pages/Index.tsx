import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/1455fd36-fbcb-4859-af00-cd1d6a6e2240/bucket/e903fde7-5d4e-425c-b4ed-1bc1f1a863e7.PNG';
const ABOUT_IMG = 'https://cdn.poehali.dev/projects/1455fd36-fbcb-4859-af00-cd1d6a6e2240/files/7ae2301a-835c-4fe8-91d3-82ba5a2a9a80.jpg';

const nav = [
  { label: 'Услуги', href: '#services' },
  { label: 'Решения', href: '#solutions' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Блог', href: '#blog' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
];

const tags = ['ERP', 'УТ', 'БП', 'ЗУП', 'УНФ', 'КА'];

const advantages = [
  { icon: 'Zap', title: 'Любые конфигурации' },
  { icon: 'Link2', title: 'Интеграции с сервисами' },
  { icon: 'Rocket', title: 'Разработка любой сложности' },
  { icon: 'Wrench', title: 'Поддержка и сопровождение' },
  { icon: 'Handshake', title: 'Индивидуальный подход' },
];

const services = [
  { icon: 'Code2', title: 'Разработка на 1С', text: 'Создаём новый функционал любой сложности' },
  { icon: 'Puzzle', title: 'Доработка типовых решений', text: 'ERP, УТ, БП, ЗУП, КА, УНФ и любые отраслевые решения' },
  { icon: 'Link', title: 'Интеграции', text: 'Сайты, CRM, Telegram, банки, API, маркетплейсы' },
  { icon: 'TrendingUp', title: 'Автоматизация процессов', text: 'Устраняем рутину и повышаем эффективность' },
  { icon: 'Cloud', title: 'Облачные решения', text: 'Переход в облако и настройка инфраструктуры' },
  { icon: 'RefreshCw', title: 'Обмены между базами', text: 'Настраиваем обмены данными между системами 1С' },
];

const solutions = [
  { icon: 'Wallet', title: 'Начисление зарплаты в банк', text: 'Автоматическое создание начислений на основании платёжных ведомостей' },
  { icon: 'Printer', title: 'Массовая печать документов', text: 'Печать любых документов из 1С в один клик' },
  { icon: 'Send', title: 'Интеграция с Telegram', text: 'Уведомления, боты, отправка документов и данных' },
  { icon: 'ShoppingCart', title: 'Автоматическое создание заказов', text: 'Создание заказов поставщикам на основании данных продаж' },
];

const portfolio = [
  { tag: 'ERP', title: 'Внедрение 1С:ERP для производства', text: 'Полный цикл автоматизации завода: от закупок до отгрузки' },
  { tag: 'Розница', title: 'Сеть из 40 магазинов на УНФ', text: 'Единая база, обмен с кассами и онлайн-аналитика продаж' },
  { tag: 'Интеграция', title: 'Маркетплейсы + 1С', text: 'Автоматическая выгрузка остатков и заказов на Wildberries и Ozon' },
];

const why = [
  { icon: 'Clock', title: 'Всегда на связи', text: 'Быстро отвечаем и решаем вопросы' },
  { icon: 'Target', title: 'Не передаём задачи подрядчикам', text: 'Вся работа выполняется нашей командой' },
  { icon: 'Gauge', title: 'Работаем быстро', text: 'Соблюдаем сроки и договорённости' },
  { icon: 'GitBranch', title: 'Предлагаем варианты решения', text: 'Находим лучший путь для вашего бизнеса' },
  { icon: 'Layers', title: 'Думаем о будущем проекта', text: 'Предлагаем решения, которые масштабируются' },
  { icon: 'FileText', title: 'Документируем разработку', text: 'Понятная документация и инструкции' },
];

const steps = [
  { n: '1', title: 'Обсуждение', text: 'Понимаем задачи и цели проекта' },
  { n: '2', title: 'Анализ', text: 'Изучаем процессы и предлагаем решение' },
  { n: '3', title: 'Разработка', text: 'Пишем код и создаём функционал' },
  { n: '4', title: 'Тестирование', text: 'Проверяем и устраняем ошибки' },
  { n: '5', title: 'Внедрение', text: 'Запускаем решение в рабочую среду' },
  { n: '6', title: 'Поддержка', text: 'Сопровождаем и развиваем систему' },
];

const blog = [
  { title: 'Как ускорить работу 1С: 10 практических советов', tag: 'Оптимизация' },
  { title: '5 способов автоматизации складского учёта', tag: 'Склад' },
  { title: 'Когда пора переходить на 1С:ERP?', tag: 'ERP' },
];

const SEND_LEAD_URL = 'https://functions.poehali.dev/c535fbbd-9be9-46d7-9689-055762068c77';

const Index = () => {
  const [form, setForm] = useState({ name: '', contact: '', task: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      setSent(true);
      setForm({ name: '', contact: '', task: '' });
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark font-sans overflow-x-hidden">
      {/* HEADER */}
      <header className="sticky top-0 z-50 glass border-b border-black/5">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="flex flex-col leading-none">
            <span className="font-display font-extrabold text-xl tracking-tight">
              PRO<span className="text-brand-orange">ximum</span>
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide">Цифровизация вашего бизнеса</span>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="text-sm font-medium hover:text-brand-orange transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-brand-orange" />
              <span className="font-display font-bold text-sm">+7 (999) 123-45-67</span>
            </div>
            <Button className="rounded-full bg-gradient-to-r from-brand-orange to-brand text-brand-dark font-semibold hover:opacity-90 hidden sm:flex">
              Обсудить проект
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid-pattern">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-brand/20 via-brand-orange/10 to-transparent blur-3xl" />
        <div className="container mx-auto relative grid lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">
          <div className="animate-fade-in">
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05]">
              Разработка решений на платформе{' '}
              <span className="gradient-text animate-gradient-x">1С:Предприятие</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Автоматизируем бизнес-процессы, создаём новые возможности и дорабатываем любые конфигурации 1С.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-gradient-to-r from-brand-orange to-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90 hover-lift">
                Обсудить проект <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-2 font-semibold text-base px-8" asChild>
                <a href="#solutions">Наши решения</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {tags.map((t) => (
                <span key={t} className="flex items-center gap-1.5 bg-white border border-black/5 rounded-full px-4 py-1.5 text-sm font-medium shadow-sm">
                  <Icon name="Check" size={14} className="text-brand-orange" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/30 to-brand/30 blur-3xl rounded-full" />
            <img src={HERO_IMG} alt="1С решения" className="relative rounded-3xl shadow-2xl animate-float" />
          </div>
        </div>
      </section>

      {/* ADVANTAGES BAR */}
      <section className="bg-gradient-to-r from-brand-dark to-brand-navy text-white">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 py-8">
          {advantages.map((a) => (
            <div key={a.title} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-orange to-brand flex items-center justify-center shrink-0">
                <Icon name={a.icon} size={20} className="text-brand-dark" />
              </div>
              <span className="text-sm font-medium leading-tight">{a.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container mx-auto py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-brand-orange/20 blur-3xl rounded-full" />
          <img src={ABOUT_IMG} alt="О компании" className="relative rounded-3xl shadow-xl" />
        </div>
        <div>
          <span className="text-brand-orange font-display font-bold text-sm tracking-widest uppercase">О компании</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3">
            Мы любим сложные задачи в <span className="gradient-text">1С</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Именно поэтому нам интересно не просто писать код, а создавать решения, которые делают работу компаний быстрее и удобнее.
          </p>
          <p className="mt-4 text-muted-foreground text-lg">
            PROximum — это команда разработчиков, которая глубоко погружается в задачи клиента и предлагает оптимальные технические решения.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-muted/40">
        <div className="container mx-auto py-20">
          <span className="text-brand-orange font-display font-bold text-sm tracking-widest uppercase">Наши услуги</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 mb-12">Что мы умеем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group bg-white rounded-2xl p-7 border border-black/5 hover-lift cursor-pointer">
                <div className="w-13 h-13 w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-orange/20 flex items-center justify-center group-hover:from-brand-orange group-hover:to-brand transition-all">
                  <Icon name={s.icon} size={26} className="text-brand-orange group-hover:text-brand-dark transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl mt-5">{s.title}</h3>
                <p className="text-muted-foreground mt-2">{s.text}</p>
                <span className="inline-flex items-center gap-1 text-brand-orange font-semibold text-sm mt-5 group-hover:gap-2 transition-all">
                  Подробнее <Icon name="ArrowRight" size={15} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="container mx-auto py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-brand-orange font-display font-bold text-sm tracking-widest uppercase">Наши решения</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3">Готовые продукты</h2>
          </div>
          <a href="#" className="hidden sm:inline-flex items-center gap-1 text-brand-orange font-semibold">
            Все решения <Icon name="ArrowRight" size={16} />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 border border-black/5 hover-lift">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-brand flex items-center justify-center mb-5">
                <Icon name={s.icon} size={22} className="text-brand-dark" />
              </div>
              <h3 className="font-display font-bold text-lg leading-tight">{s.title}</h3>
              <p className="text-muted-foreground text-sm mt-3">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-gradient-to-br from-brand-dark to-brand-navy text-white">
        <div className="container mx-auto py-20">
          <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Портфолио</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 mb-12">Реализованные проекты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.map((p) => (
              <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <span className="inline-block bg-gradient-to-r from-brand-orange to-brand text-brand-dark text-xs font-bold px-3 py-1 rounded-full">
                  {p.tag}
                </span>
                <h3 className="font-display font-bold text-xl mt-5">{p.title}</h3>
                <p className="text-white/60 mt-3">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="container mx-auto py-20">
        <span className="text-brand-orange font-display font-bold text-sm tracking-widest uppercase">Почему выбирают нас</span>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {why.map((w) => (
            <div key={w.title} className="flex gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand/15 to-brand-orange/15 flex items-center justify-center shrink-0">
                <Icon name={w.icon} size={20} className="text-brand-orange" />
              </div>
              <div>
                <h3 className="font-display font-bold">{w.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-muted/40">
        <div className="container mx-auto py-20">
          <span className="text-brand-orange font-display font-bold text-sm tracking-widest uppercase">Как мы работаем</span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-10">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand flex items-center justify-center font-display font-extrabold text-brand-dark text-lg mb-4">
                  {s.n}
                </div>
                <h3 className="font-display font-bold">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG + CONTACT FORM */}
      <section id="blog" className="container mx-auto py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-brand-orange font-display font-bold text-sm tracking-widest uppercase">Блог</span>
          <h2 className="font-display font-extrabold text-3xl mt-3 mb-8">Полезные статьи</h2>
          <div className="space-y-4">
            {blog.map((b) => (
              <a key={b.title} href="#" className="flex items-center gap-5 bg-white border border-black/5 rounded-2xl p-5 hover-lift">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-orange to-brand flex items-center justify-center shrink-0">
                  <Icon name="FileText" size={26} className="text-brand-dark" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-brand-orange">{b.tag}</span>
                  <h3 className="font-display font-bold leading-tight">{b.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div id="contacts" className="bg-gradient-to-br from-brand-dark to-brand-navy rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange/30 blur-3xl rounded-full" />
          <h2 className="font-display font-extrabold text-3xl relative">Есть проект? Давайте обсудим</h2>
          <p className="text-white/60 mt-3 relative">Заполните форму, и мы свяжемся с вами в ближайшее время.</p>
          {sent ? (
            <div className="mt-8 flex flex-col items-center justify-center text-center py-10 animate-scale-in relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-brand flex items-center justify-center mb-4">
                <Icon name="Check" size={32} className="text-brand-dark" />
              </div>
              <p className="font-display font-bold text-xl">Заявка отправлена!</p>
              <p className="text-white/60 mt-1">Скоро свяжемся с вами.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4 relative">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl h-12" />
                <Input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Телефон или Telegram" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl h-12" />
              </div>
              <Textarea value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} placeholder="Опишите задачу" rows={4} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl" />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <Button type="submit" disabled={loading} size="lg" className="w-full rounded-xl bg-gradient-to-r from-brand-orange to-brand text-brand-dark font-bold text-base hover:opacity-90 disabled:opacity-60">
                {loading ? 'Отправляем...' : <><span>Отправить заявку</span><Icon name="Send" size={18} className="ml-1" /></>}
              </Button>
            </form>
          )}
          <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm relative">
            <div className="flex items-center gap-2"><Icon name="Phone" size={16} className="text-brand-orange" /> +7 (999) 123-45-67</div>
            <div className="flex items-center gap-2"><Icon name="Mail" size={16} className="text-brand-orange" /> info@proximum.ru</div>
            <div className="flex items-center gap-2"><Icon name="Send" size={16} className="text-brand-orange" /> @proximum</div>
            <div className="flex items-center gap-2"><Icon name="MapPin" size={16} className="text-brand-orange" /> г. Москва</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-white/70">
        <div className="container mx-auto py-12 grid md:grid-cols-3 gap-8">
          <div>
            <span className="font-display font-extrabold text-xl text-white">
              PRO<span className="text-brand-orange">ximum</span>
            </span>
            <p className="text-sm mt-3 max-w-xs">Разработка, доработка и сопровождение решений на платформе 1С:Предприятие. Решаем задачи любой сложности.</p>
            <div className="flex gap-3 mt-5">
              {['Send', 'MessageCircle', 'Youtube'].map((i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange hover:text-brand-dark transition-colors">
                  <Icon name={i} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.label}><a href={n.href} className="hover:text-brand-orange transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>+7 (999) 123-45-67</li>
              <li>info@proximum.ru</li>
              <li>@proximum</li>
              <li>г. Москва</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container mx-auto py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs">
            <span>© 2026 PROximum. Все права защищены.</span>
            <div className="flex gap-5">
              <a href="#" className="hover:text-brand-orange">Политика конфиденциальности</a>
              <a href="#" className="hover:text-brand-orange">Публичная оферта</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;