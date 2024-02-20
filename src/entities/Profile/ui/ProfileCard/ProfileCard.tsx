import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Profile } from 'entities/Profile/model/types/Profile';
import { Loader } from 'shared/ui/loader/Loader';
import { PageError } from 'widgets/PageError';
import { Avatar } from 'shared/ui/avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/Currency';
import { CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';
import { Text } from 'shared/ui/text/Text';

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeFirstName?: (value: string) => void;
  onChangeLastName: (value: string) => void;
  onChangeAge: (value: string) => void;
  onChangeCity: (value: string) => void;
  onChangeAvatar: (value: string) => void;
  onChangeUserName: (value: string) => void;
  onChangeCurrency: (currency: Currency) => void;
  onChangeCountry: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUserName,
    onChangeCurrency,
    onChangeCountry,
  } = props;

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className])}>
        <PageError />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className])}>
        <Loader className={cls.loader} />
      </div>
    );
  }

  const mods: Mods = { [cls.editing]: !readonly };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            {' '}
            <Avatar src={data.avatar} />{' '}
          </div>
        )}
        <Text text="Ваше имя :" className={cls.text} />
        <input
          className={cls.input}
          value={data?.first || ''}
          readOnly={readonly}
          onChange={(e) => {
            if (onChangeFirstName) {
              onChangeFirstName(e.target.value);
            }
          }}
        ></input>
        <Text text="Ваша фамилия :" className={cls.text} />
        <input
          className={cls.input}
          value={data?.lastname || ''}
          readOnly={readonly}
          onChange={(e) => onChangeLastName(e.target.value)}
        ></input>
        <Text text="Ваш никнейм :" className={cls.text} />
        <input
          className={cls.input}
          value={data?.username || ''}
          readOnly={readonly}
          onChange={(e) => onChangeUserName(e.target.value)}
        ></input>
        <Text text="Ваш Город :" className={cls.text} />
        <input
          className={cls.input}
          value={data?.city || ''}
          readOnly={readonly}
          onChange={(e) => onChangeCity(e.target.value)}
        ></input>
        <Text text="Ваш Возраст :" className={cls.text} />
        <input
          className={cls.input}
          value={data?.age || ''}
          readOnly={readonly}
          onChange={(e) => onChangeAge(e.target.value)}
        ></input>
        <Text text="Аватарка :" className={cls.text} />
        <input
          className={cls.input}
          value={data?.avatar || ''}
          readOnly={readonly}
          onChange={(e) => onChangeAvatar(e.target.value)}
        ></input>

        <CurrencySelect
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readonly}
          className={cls.select}
        />
        <CountrySelect
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readonly}
          className={cls.select}
        />
      </div>
    </div>
  );
};
