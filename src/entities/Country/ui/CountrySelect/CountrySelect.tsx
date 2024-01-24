import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/select/Select';
import { Country } from '../../model/types/Country';
import { memo, useCallback } from 'react';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { content: Country.Belarus, value: Country.Belarus },
  { content: Country.Russia, value: Country.Russia },
  { content: Country.Ukraine, value: Country.Ukraine },
];

export const CountrySelect = memo(
  ({ className, value, onChange, readonly }: CountrySelectProps) => {
    const onChangeHandler = useCallback(
      (value?: string) => {
        onChange?.(value as Country);
      },
      [onChange]
    );

    return (
      <div className={classNames('', {}, [className])}>
        <Select
          label="ваша страна"
          options={options}
          value={value}
          onChange={onChangeHandler}
          readonly={readonly}
        />
      </div>
    );
  }
);
