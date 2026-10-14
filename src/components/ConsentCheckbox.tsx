import { useId } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentCheckbox = ({ checked, onChange }: ConsentCheckboxProps) => {
  const id = useId();

  return (
    <div className="flex items-start gap-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onChange(v === true)}
        className="mt-0.5 h-5 w-5 rounded-md border-white/40 bg-white/10 data-[state=checked]:bg-brand data-[state=checked]:text-brand-dark data-[state=checked]:border-brand"
      />
      <label htmlFor={id} className="text-xs text-white/60 leading-snug cursor-pointer">
        Я даю{' '}
        <Link to="/consent" target="_blank" className="text-brand underline">
          согласие на обработку персональных данных
        </Link>{' '}
        и принимаю{' '}
        <Link to="/privacy" target="_blank" className="text-brand underline">
          политику конфиденциальности
        </Link>
      </label>
    </div>
  );
};

export default ConsentCheckbox;
