import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LeadFormModal from '@/components/LeadFormModal';
import ContactsModal from '@/components/ContactsModal';

const facts = [
  { icon: 'CalendarCheck', title: 'С 1 сентября 2026', text: 'Электронная транспортная накладная обязательна для всех перевозчиков' },
  { icon: 'FileStack', title: '4 документа', text: 'ЭТрН, заказ-заявка, путевой лист и сопроводительная ведомость' },
  { icon: 'ShieldAlert', title: 'До 1 марта 2027', text: 'Переходный период — время внедрить обмен без рисков' },
  { icon: 'Headset', title: 'Поддержка 1С', text: 'Отвечаем на вопросы по обмену и помогаем на каждом этапе' },
];

const services = [
  {
    icon: 'PlugZap',
    title: 'Подключение 1С к ГИС ЭПД',
    text: 'Настраиваем связку вашей базы с оператором ЭДО и государственной системой электронных перевозочных документов. Проверяем сертификаты, роуминг и права доступа.',
  },
  {
    icon: 'FileCog',
    title: 'Доработка документов под ЭТрН',
    text: 'Дополняем накладные нужными реквизитами: перевозчик, водитель, транспорт, точки погрузки и разгрузки, переадресация. Формы соответствуют формату ФНС.',
  },
  {
    icon: 'Workflow',
    title: 'Автоматизация обмена титулами',
    text: 'Настраиваем последовательность подписания: грузоотправитель → перевозчик → водитель → грузополучатель. Статусы приходят в 1С автоматически.',
  },
  {
    icon: 'Signature',
    title: 'Электронная подпись и роли',
    text: 'Настраиваем УКЭП для ответственных сотрудников, распределяем права по складам, филиалам и водителям.',
  },
  {
    icon: 'RefreshCcw',
    title: 'Интеграция с TMS и WMS',
    text: 'Связываем 1С с системами управления транспортом и складом, чтобы ЭТрН формировалась из существующих заявок без двойного ввода.',
  },
  {
    icon: 'GraduationCap',
    title: 'Обучение сотрудников',
    text: 'Проводим обучение логистов, кладовщиков и бухгалтерии, готовим короткие инструкции с реальными примерами из вашей базы.',
  },
];

const problems = [
  'Накладная не уходит оператору — ошибка в формате или реквизитах',
  'Водитель не может подписать документ с телефона',
  'Контрагент работает с другим оператором ЭДО — нужен роуминг',
  'Статусы подписания не возвращаются в 1С',
  'Данные приходится вводить дважды — в 1С и в кабинете оператора',
  'Неясно, кто и в какой момент подписывает титулы',
];

const steps = [
  { n: '1', title: 'Аудит', text: 'Смотрим вашу конфигурацию, процессы перевозок и текущий ЭДО' },
  { n: '2', title: 'План перехода', text: 'Готовим схему обмена и список доработок с оценкой сроков' },
  { n: '3', title: 'Настройка', text: 'Подключаем оператора, дорабатываем документы и печатные формы' },
  { n: '4', title: 'Тестовый обмен', text: 'Прогоняем реальные перевозки с контрагентами' },
  { n: '5', title: 'Запуск', text: 'Переводим всех сотрудников на электронный документооборот' },
  { n: '6', title: 'Поддержка', text: 'Профессиональная поддержка на связи и после запуска' },
];

const faq = [
  {
    q: 'Обязательна ли ЭТрН для всех перевозчиков?',
    a: 'Да. С 1 сентября 2026 года транспортные накладные оформляются в электронном виде. Бумажная накладная больше не является основным документом при перевозке грузов автотранспортом.',
  },
  {
    q: 'Что будет, если не перейти на ЭТрН?',
    a: 'До 1 марта 2027 года действует переходный период, во время которого дорожные штрафы за отсутствие электронного документа не применяются. Но сложности начнутся раньше: контрагенты уже требуют электронный обмен, а бумажные документы усложняют подтверждение расходов и вычетов НДС.',
  },
  {
    q: 'Подойдёт ли моя конфигурация 1С?',
    a: 'Да, мы работаем с 1С:ERP, УТ, КА, БП, УНФ и отраслевыми решениями, включая доработанные конфигурации. Если типовой механизм не подходит под ваши процессы, дорабатываем его под задачу.',
  },
  {
    q: 'Сколько занимает внедрение?',
    a: 'Для типовой конфигурации без сложных доработок — от нескольких дней до двух недель. Для крупных компаний с интеграциями и филиальной структурой составляем поэтапный план.',
  },
  {
    q: 'Кто отвечает на вопросы после запуска?',
    a: 'Наши специалисты. Профессиональная поддержка разбирает любые вопросы по обмену ЭТрН: ошибки формата, роуминг, статусы подписания, работа водителей в мобильном приложении.',
  },
];

const Etrn = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            <Link to="/etrn" className="text-sm font-medium text-brand transition-colors">ЭТрН</Link>
            <Link to="/portfolio" className="text-sm font-medium hover:text-brand transition-colors">Проекты</Link>
            <Link to="/clients" className="text-sm font-medium hover:text-brand transition-colors">Клиенты</Link>
            <button onClick={() => setContactsOpen(true)} className="text-sm font-medium hover:text-brand transition-colors">Контакты</button>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Icon name="Phone" size={16} className="text-brand" />
              <div className="flex flex-col leading-tight">
                <a href="tel:+74952754450" className="font-display font-bold text-sm hover:text-brand transition-colors">+7 (495) 275-44-50</a>
                <a href="tel:+79268959606" className="text-xs text-muted-foreground hover:text-brand transition-colors">+7 (926) 895-96-06</a>
              </div>
            </div>
            <Button onClick={() => setFormOpen(true)} className="rounded-full bg-brand text-brand-dark font-semibold hover:opacity-90 hidden sm:flex">
              Получить консультацию
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid-pattern">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-brand/20 via-brand/10 to-transparent blur-3xl" />
        <div className="container mx-auto relative py-16 lg:py-20">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-brand transition-colors mb-6">
            <Icon name="ArrowLeft" size={16} /> На главную
          </Link>
          <span className="inline-flex items-center gap-2 bg-brand text-brand-dark text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
            <Icon name="Truck" size={14} /> Обязательно с 1 сентября 2026
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mt-5 max-w-3xl leading-tight">
            Электронные транспортные накладные <span className="gradient-text">ЭТрН</span> в 1С
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Мы специализируемся на внедрении ЭТрН: подключаем 1С к ГИС ЭПД, дорабатываем документы под новый формат
            и даём профессиональную поддержку, которая ответит на все ваши вопросы.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => setFormOpen(true)} className="rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90 hover-lift">
              Получить консультацию <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 font-semibold text-base px-8" asChild>
              <a href="tel:+74952754450">
                <Icon name="Phone" size={18} className="mr-2" /> +7 (495) 275-44-50
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="bg-brand-dark text-white">
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          {facts.map((f) => (
            <div key={f.title} className="flex gap-3">
              <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center shrink-0">
                <Icon name={f.icon} size={20} className="text-brand-dark" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm">{f.title}</h3>
                <p className="text-white/60 text-sm mt-1 leading-snug">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT CHANGED */}
      <section className="container mx-auto py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Что изменилось</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3">
            Бумажная накладная больше не работает
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            С 1 сентября 2026 года перевозочные документы оформляются в электронном виде и передаются в
            государственную информационную систему электронных перевозочных документов через оператора ЭДО.
            Это касается всех участников перевозки: грузоотправителей, перевозчиков и грузополучателей.
          </p>
          <p className="mt-4 text-muted-foreground text-lg">
            Практика показывает: сложности возникают не в законе, а в настройке обмена. Мы берём эту часть на себя —
            от подключения оператора до обучения водителей.
          </p>
          <Button size="lg" onClick={() => setFormOpen(true)} className="mt-8 rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90">
            Обсудить переход на ЭТрН <Icon name="ArrowRight" size={18} className="ml-1" />
          </Button>
        </div>
        <div className="bg-white border border-black/5 rounded-3xl p-8">
          <h3 className="font-display font-bold text-xl">С какими проблемами к нам приходят</h3>
          <ul className="mt-6 space-y-3.5">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="AlertCircle" size={14} className="text-brand" />
                </div>
                <span className="text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 pt-6 border-t border-black/5 flex items-center gap-3">
            <Icon name="CheckCircle2" size={20} className="text-brand shrink-0" />
            <span className="font-semibold">Каждую из этих задач мы уже решали</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-muted/40">
        <div className="container mx-auto py-20">
          <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Наши работы по ЭТрН</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 mb-12">Что мы настраиваем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} onClick={() => setFormOpen(true)} className="group bg-white rounded-2xl p-7 border border-black/5 hover-lift cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-graphite/20 flex items-center justify-center group-hover:bg-brand transition-all">
                  <Icon name={s.icon} size={26} className="text-brand group-hover:text-brand-dark transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl mt-5">{s.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="container mx-auto py-20">
        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand/20 blur-3xl rounded-full" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Профессиональная поддержка</span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3">
                Ответим на все вопросы по ЭТрН
              </h2>
              <p className="text-white/70 mt-5 text-lg">
                Наши специалисты знают ЭТрН изнутри: форматы, титулы, роуминг между операторами и особенности
                конкретных конфигураций 1С. Разбираем вопросы по существу, а не по инструкции.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" onClick={() => setFormOpen(true)} className="rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90">
                  Задать вопрос <Icon name="ArrowRight" size={18} className="ml-1" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8" asChild>
                  <a href="tel:+74952754450">Позвонить</a>
                </Button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: 'MessageSquare', t: 'Быстрый ответ', d: 'На связи в рабочее время, без очередей' },
                { icon: 'UserCheck', t: 'Живые специалисты', d: 'Разработчики 1С, а не операторы скриптов' },
                { icon: 'Truck', t: 'Опыт в логистике', d: 'Знаем процессы перевозок на практике' },
                { icon: 'BookOpen', t: 'Инструкции', d: 'Документируем настройки под вашу базу' },
              ].map((c) => (
                <div key={c.t} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <Icon name={c.icon} size={22} className="text-brand" />
                  <h3 className="font-display font-bold mt-4">{c.t}</h3>
                  <p className="text-white/60 text-sm mt-1.5">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-muted/40">
        <div className="container mx-auto py-20">
          <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">План перехода</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 mb-12">Как мы внедряем ЭТрН</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center font-display font-extrabold text-brand-dark text-lg mb-4">
                  {s.n}
                </div>
                <h3 className="font-display font-bold">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto py-20 max-w-3xl">
        <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Частые вопросы</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 mb-10">Отвечаем на главное</h2>
        <div className="space-y-3">
          {faq.map((f, i) => (
            <div key={f.q} className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-display font-bold text-lg">{f.q}</span>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={`text-brand shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white">
        <div className="container mx-auto py-16 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl">Готовы перейти на ЭТрН?</h2>
          <p className="text-white/60 mt-3 max-w-lg mx-auto">
            Расскажите о своих перевозках — оценим объём работ и предложим план внедрения.
          </p>
          <Button size="lg" onClick={() => setFormOpen(true)} className="mt-8 rounded-full bg-brand text-brand-dark font-semibold text-base px-8 hover:opacity-90">
            Получить консультацию <Icon name="ArrowRight" size={18} className="ml-1" />
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
      <ContactsModal open={contactsOpen} onOpenChange={setContactsOpen} />
    </div>
  );
};

export default Etrn;
