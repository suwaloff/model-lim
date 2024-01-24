import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/select/Select';
import { Currency } from '../../model/types/Currency';
import { memo, useCallback } from 'react';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { content: Currency.RUB, value: Currency.RUB },
  { content: Currency.EUR, value: Currency.EUR },
  { content: Currency.USD, value: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const onChangeHandler = useCallback(
      (value?: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );

    return (
      <div className={classNames('', {}, [className])}>
        <Select
          label="ваша валюта"
          options={options}
          value={value}
          onChange={onChangeHandler}
          readonly={readonly}
        />
      </div>
    );
  }
);
