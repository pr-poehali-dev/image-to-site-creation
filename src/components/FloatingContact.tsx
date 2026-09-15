import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { contacts } from '@/data/contacts';

const actions = [
  {
    icon: 'Send',
    label: 'Telegram',
    value: contacts.telegram.label,
    href: contacts.telegram.href,
    external: true,
    color: 'bg-[#2AABEE] text-white',
  },
  {
    icon: 'Phone',
    label: 'Позвонить',
    value: contacts.phoneMain.label,
    href: contacts.phoneMain.href,
    color: 'bg-brand text-brand-dark',
  },
  {
    icon: 'Mail',
    label: 'Написать на почту',
    value: contacts.email.label,
    href: contacts.email.href,
    color: 'bg-white text-brand-dark',
  },
];

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {actions.map((a, i) => (
        <a
          key={a.href}
          href={a.href}
          target={a.external ? '_blank' : undefined}
          rel={a.external ? 'noopener noreferrer' : undefined}
          onClick={() => setOpen(false)}
          style={{ transitionDelay: `${open ? (actions.length - 1 - i) * 50 : i * 40}ms` }}
          className={`flex items-center gap-3 transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <span className="bg-brand-dark text-white text-sm rounded-xl px-3.5 py-2 shadow-lg whitespace-nowrap">
            <span className="font-display font-bold block leading-tight">{a.label}</span>
            <span className="text-white/60 text-xs">{a.value}</span>
          </span>
          <span className={`w-12 h-12 rounded-full ${a.color} shadow-lg flex items-center justify-center shrink-0 hover:scale-110 transition-transform`}>
            <Icon name={a.icon} size={20} />
          </span>
        </a>
      ))}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Закрыть меню связи' : 'Связаться с нами'}
        className="relative w-14 h-14 rounded-full bg-brand text-brand-dark shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-40" />}
        <Icon name={open ? 'X' : 'MessageCircle'} size={24} className="relative" />
      </button>
    </div>
  );
};

export default FloatingContact;
