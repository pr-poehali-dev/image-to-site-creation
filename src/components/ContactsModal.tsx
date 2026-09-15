import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { contacts } from '@/data/contacts';

interface ContactsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const rows = [
  { icon: 'Phone', ...contacts.phoneMain },
  { icon: 'Smartphone', ...contacts.phoneMobile },
  { icon: 'Mail', ...contacts.email },
  { icon: 'Send', ...contacts.telegram, external: true },
  { icon: 'Globe', ...contacts.site, external: true },
];

const ContactsModal = ({ open, onOpenChange }: ContactsModalProps) => {
  const mapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(
    contacts.address.mapQuery
  )}&z=17`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-dark text-white border-white/10 rounded-3xl sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-3xl rounded-full pointer-events-none" />
        <DialogHeader className="relative">
          <DialogTitle className="font-display font-extrabold text-2xl text-white">Наши контакты</DialogTitle>
          <DialogDescription className="text-white/60">
            Свяжитесь удобным способом — ответим в рабочее время.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 relative">
          {rows.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target={'external' in r && r.external ? '_blank' : undefined}
              rel={'external' in r && r.external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center shrink-0">
                <Icon name={r.icon} size={20} className="text-brand-dark" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold truncate">{r.label}</p>
                <p className="text-white/50 text-xs mt-0.5">{r.note}</p>
              </div>
              <Icon
                name="ArrowUpRight"
                size={18}
                className="text-white/30 group-hover:text-brand transition-colors shrink-0"
              />
            </a>
          ))}
        </div>

        <div className="relative">
          <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center shrink-0">
              <Icon name="MapPin" size={20} className="text-brand-dark" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold leading-snug">{contacts.address.label}</p>
              <a
                href={contacts.address.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand text-xs font-semibold inline-flex items-center gap-1 mt-1.5 hover:gap-2 transition-all"
              >
                Открыть в Яндекс Картах <Icon name="ArrowRight" size={13} />
              </a>
            </div>
          </div>
          <div className="mt-3 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              src={mapSrc}
              title="Карта — офис PROximum"
              width="100%"
              height="220"
              frameBorder="0"
              allowFullScreen
              className="block"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsModal;
