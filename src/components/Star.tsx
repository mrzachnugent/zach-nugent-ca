import { FC } from 'react';
import { BsStarFill } from 'react-icons/bs';

interface StarProps {
  disabled?: boolean;
  onClick?(): void;
  className?: string;
  checked?: boolean;
  isLarge?: boolean;
}

export const Star: FC<StarProps> = ({
  disabled = false,
  onClick,
  className,
  checked = true,
  isLarge = false,
}) => (
  <button
    className={
      disabled ? className : 'btn btn-ghost focus:outline-info' + className
    }
    disabled={disabled}
    onClick={onClick}
  >
    <BsStarFill
      size={isLarge ? '2.2em' : '1.2em'}
      style={{ color: checked ? '#ebb500' : '#FFFFFF50' }}
      className={'mx-2'}
    />
  </button>
);
