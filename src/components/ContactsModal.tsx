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
      <DialogContent className="bg-brand-dark text-white border-white/10 rounded-3xl sm:max-w-2xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-3xl rounded-full pointer-events-none" />
        <DialogHeader className="relative">
          <DialogTitle className="font-display font-extrabold text-2xl text-white">Наши контакты</DialogTitle>
          <DialogDescription className="text-white/60">
            Свяжитесь удобным способом — ответим в рабочее время.
          </DialogDescription>
        </DialogHeader>

        <div className="relative grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            {rows.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target={'external' in r && r.external ? '_blank' : undefined}
                rel={'external' in r && r.external ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center shrink-0">
                  <Icon name={r.icon} size={17} className="text-brand-dark" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-sm truncate">{r.label}</p>
                  <p className="text-white/50 text-[11px] leading-tight">{r.note}</p>
                </div>
                <Icon
                  name="ArrowUpRight"
                  size={16}
                  className="text-white/30 group-hover:text-brand transition-colors shrink-0"
                />
              </a>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="rounded-xl overflow-hidden border border-white/10 flex-1 min-h-[180px]">
              <iframe
                src={mapSrc}
                title="Карта — офис PROximum"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="block w-full h-full min-h-[180px]"
              />
            </div>
            <div className="flex items-start gap-2 mt-3">
              <Icon name="MapPin" size={16} className="text-brand shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm leading-snug">{contacts.address.label}</p>
                <a
                  href={contacts.address.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand text-xs font-semibold inline-flex items-center gap-1 mt-1 hover:gap-2 transition-all"
                >
                  Открыть в Яндекс Картах <Icon name="ArrowRight" size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactsModal;