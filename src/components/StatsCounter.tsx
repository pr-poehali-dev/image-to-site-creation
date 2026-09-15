import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { value: 2, suffix: ' года', label: 'на рынке 1С', icon: 'CalendarDays' },
  { value: 40, suffix: '+', label: 'реализованных проектов', icon: 'CheckCircle2' },
  { value: 8, label: 'постоянных клиентов', icon: 'Users' },
  { value: 1, suffix: 'ч', label: 'реакция на обращение', icon: 'Timer' },
];

const useCountUp = (target: number, start: boolean, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
};

const StatItem = ({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) => {
  const value = useCountUp(stat.value, active);

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`text-center transition-all duration-700 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-brand mx-auto flex items-center justify-center">
        <Icon name={stat.icon} size={24} className="text-brand-dark" />
      </div>
      <div className="font-display font-extrabold text-4xl md:text-5xl mt-5 tabular-nums">
        {value}
        <span className={`text-brand ${stat.suffix && stat.suffix.length > 2 ? 'text-2xl md:text-3xl' : ''}`}>
          {stat.suffix}
        </span>
      </div>
      <p className="text-white/60 text-sm mt-2">{stat.label}</p>
    </div>
  );
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute -top-20 left-1/4 w-80 h-80 bg-brand/15 blur-3xl rounded-full pointer-events-none" />
      <div className="container mx-auto py-16 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} active={active} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;