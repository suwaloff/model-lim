import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTHeme {
  CLEAR = 'clear',
  MAIN = 'main',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted',
}

export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTHeme;
  size?: ButtonSize;
  square?: boolean;
  disabled?: boolean;
}

export const Button = (props: ButtonProps): React.ReactElement<ButtonProps> => {
  const { className, children, theme, size, square, disabled, ...otherProps } = props;

  const mods: Record<string, boolean> = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  };
  return (
    <button
      className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
