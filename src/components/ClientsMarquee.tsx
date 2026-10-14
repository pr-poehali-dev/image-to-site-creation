import { Link } from 'react-router-dom';
import { clients } from '@/data/clients';

const MIN_ITEMS = 10;

const ClientsMarquee = () => {
  const repeats = Math.max(1, Math.ceil(MIN_ITEMS / clients.length));
  const group = Array.from({ length: repeats }, () => clients).flat();
  const duration = `${group.length * 4}s`;

  const renderGroup = (hidden: boolean) =>
    group.map((c, i) => (
      <Link
        key={`${c.name}-${i}`}
        to="/clients"
        title={c.name}
        aria-hidden={hidden || undefined}
        tabIndex={hidden ? -1 : undefined}
        className="group bg-white rounded-2xl px-6 flex items-center justify-center h-24 w-52 shrink-0 hover:scale-105 transition-transform"
      >
        {c.logo ? (
          <img src={c.logo} alt={c.name} className="max-h-14 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
          <span className="text-sm font-display font-bold text-center text-brand-dark/70 group-hover:text-brand-dark transition-colors">
            {c.name}
          </span>
        )}
      </Link>
    ));

  return (
    <div
      className="group/marquee relative overflow-hidden py-2"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        <div className="flex gap-4 pr-4 shrink-0">{renderGroup(false)}</div>
        <div className="flex gap-4 pr-4 shrink-0">{renderGroup(true)}</div>
      </div>
    </div>
  );
};

export default ClientsMarquee;