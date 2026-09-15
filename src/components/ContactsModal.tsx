import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface ContactsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const contacts = [
  {
    icon: 'Phone',
    label: 'Основной телефон',
    value: '+7 (495) 275-44-50',
    href: 'tel:+74952754450',
    note: 'Техподдержка первой линии',
  },
  {
    icon: 'Smartphone',
    label: 'Мобильный',
    value: '+7 (926) 895-96-06',
    href: 'tel:+79268959606',
  },
  {
    icon: 'Mail',
    label: 'Почта поддержки',
    value: 'help@itproximum.ru',
    href: 'mailto:help@itproximum.ru',
  },
  {
    icon: 'Mail',
    label: 'Общая почта',
    value: 'info@proximum.ru',
    href: 'mailto:info@proximum.ru',
  },
  {
    icon: 'Send',
    label: 'Telegram',
    value: '@VasiliiEremin',
    href: 'https://t.me/VasiliiEremin',
    external: true,
  },
  {
    icon: 'Globe',
    label: 'Сайт',
    value: 'itproximum.ru',
    href: 'https://itproximum.ru',
    external: true,
  },
];

const ContactsModal = ({ open, onOpenChange }: ContactsModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="bg-brand-dark text-white border-white/10 rounded-3xl sm:max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-3xl rounded-full pointer-events-none" />
      <DialogHeader className="relative">
        <DialogTitle className="font-display font-extrabold text-2xl text-white">Наши контакты</DialogTitle>
        <DialogDescription className="text-white/60">
          Свяжитесь любым удобным способом — ответим в рабочее время.
        </DialogDescription>
      </DialogHeader>

      <div className="relative grid sm:grid-cols-2 gap-3 mt-2">
        {contacts.map((c) => (
          <a
            key={c.value}
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noreferrer' : undefined}
            className="group flex items-start gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-brand/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shrink-0">
              <Icon name={c.icon} size={18} className="text-brand-dark" />
            </div>
            <div className="min-w-0">
              <span className="block text-xs text-white/50">{c.label}</span>
              <span className="block font-display font-bold text-sm mt-0.5 truncate group-hover:text-brand transition-colors">
                {c.value}
              </span>
              {c.note && <span className="block text-xs text-white/40 mt-1">{c.note}</span>}
            </div>
          </a>
        ))}
      </div>

      <div className="relative flex items-center gap-2 text-white/50 text-sm mt-2 pt-4 border-t border-white/10">
        <Icon name="MapPin" size={16} className="text-brand shrink-0" /> г. Москва
      </div>
    </DialogContent>
  </Dialog>
);

export default ContactsModal;
