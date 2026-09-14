import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { news } from '@/data/news';

const NewsScroller = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section id="news" className="bg-muted/40">
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-brand font-display font-bold text-sm tracking-widest uppercase">Последние новости</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3">Что меняется в законодательстве</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              Следим за изменениями и заранее готовим ваши базы 1С к новым требованиям.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Предыдущие новости"
              className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors"
            >
              <Icon name="ArrowLeft" size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Следующие новости"
              className="w-11 h-11 rounded-full bg-white border border-black/10 flex items-center justify-center hover:bg-brand hover:border-brand transition-colors"
            >
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
        >
          {news.map((n) => (
            <article
              key={n.title}
              className={`snap-start shrink-0 w-[300px] md:w-[340px] rounded-2xl p-6 border flex flex-col hover-lift ${
                n.hot ? 'bg-brand-dark text-white border-brand/40' : 'bg-white border-black/5'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    n.hot ? 'bg-brand' : 'bg-gradient-to-br from-brand/20 to-brand-graphite/20'
                  }`}
                >
                  <Icon name={n.icon} size={20} className={n.hot ? 'text-brand-dark' : 'text-brand'} />
                </div>
                {n.hot && (
                  <span className="bg-brand text-brand-dark text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Важно
                  </span>
                )}
              </div>

              <span className={`text-xs font-semibold mt-5 ${n.hot ? 'text-brand' : 'text-brand'}`}>{n.tag}</span>
              <h3 className="font-display font-bold text-lg leading-tight mt-1.5">{n.title}</h3>
              <p className={`text-sm mt-3 flex-1 ${n.hot ? 'text-white/70' : 'text-muted-foreground'}`}>{n.text}</p>

              <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-black/5">
                <span className={`text-xs flex items-center gap-1.5 ${n.hot ? 'text-white/50' : 'text-muted-foreground'}`}>
                  <Icon name="Calendar" size={13} /> {n.date}
                </span>
                {n.link && (
                  <Link
                    to={n.link}
                    className="inline-flex items-center gap-1 text-brand font-semibold text-sm hover:gap-2 transition-all shrink-0"
                  >
                    {n.linkLabel ?? 'Подробнее'} <Icon name="ArrowRight" size={15} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsScroller;
