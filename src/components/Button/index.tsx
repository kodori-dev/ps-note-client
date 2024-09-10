import { ReactNode } from 'react';

interface Props {
  theme?: 'primary' | 'secondary';
  onClickFunc?: () => void;
  roundSize?: 'sm' | 'md' | 'lg';
  heightSize?: 'sm' | 'lg';
  children: ReactNode;
  customStyle?: string;
  disabled?: boolean;
}

const STYLE = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'bg-white text-primary hover:bg-gray-100 border border-primary',
  disabled: 'bg-gray-4 text-white cursor-not-allowed',
};

const HEIGHT_STYLE = {
  sm: 'h-11',
  lg: 'h-[54px]',
};

function Button({ theme = 'primary', roundSize = 'md', onClickFunc, heightSize = 'lg', children, customStyle = '', disabled = false }: Props) {
  const style = [STYLE[disabled ? 'disabled' : theme], HEIGHT_STYLE[heightSize], `rounded-${roundSize}`, customStyle].join(' ');

  return (
    <button onClick={onClickFunc} className={`${style}`} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
