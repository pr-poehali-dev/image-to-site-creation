import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const SEND_LEAD_URL = 'https://functions.poehali.dev/c535fbbd-9be9-46d7-9689-055762068c77';

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadFormModal = ({ open, onOpenChange }: LeadFormModalProps) => {
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
      setTimeout(() => {
        setSent(false);
        onOpenChange(false);
      }, 3000);
    } catch {
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-dark text-white border-white/10 rounded-3xl sm:max-w-md overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 blur-3xl rounded-full pointer-events-none" />
        <DialogHeader className="relative">
          <DialogTitle className="font-display font-extrabold text-2xl text-white">Есть проект? Давайте обсудим</DialogTitle>
          <DialogDescription className="text-white/60">
            Заполните форму, и мы свяжемся с вами в ближайшее время.
          </DialogDescription>
        </DialogHeader>
        {sent ? (
          <div className="flex flex-col items-center justify-center text-center py-8 animate-scale-in relative">
            <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mb-4">
              <Icon name="Check" size={32} className="text-brand-dark" />
            </div>
            <p className="font-display font-bold text-xl">Заявка отправлена!</p>
            <p className="text-white/60 mt-1">Скоро свяжемся с вами.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 relative">
            <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl h-12" />
            <Input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Телефон или Telegram" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl h-12" />
            <Textarea value={form.task} onChange={(e) => setForm({ ...form, task: e.target.value })} placeholder="Опишите задачу" rows={4} className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} size="lg" className="w-full rounded-xl bg-brand text-brand-dark font-bold text-base hover:opacity-90 disabled:opacity-60">
              {loading ? 'Отправляем...' : <><span>Отправить заявку</span><Icon name="Send" size={18} className="ml-1" /></>}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
