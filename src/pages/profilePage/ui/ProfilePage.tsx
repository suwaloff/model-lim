import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import {
  ProfileCard,
  getProfileError,
  getProfileIsLoading,
  profileReducer,
  fetchProfileData,
  profileActions,
  getProfileReadonly,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileErrors } from 'entities/Profile/model/selectors/getProfileValidateErrors/getProfileErrors';
import { Text, TextTheme } from 'shared/ui/text/Text';
import { ValidateProfileError } from 'entities/Profile/model/types/Profile';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const formData = useSelector(getProfileForm);
  const errors = useSelector(getProfileErrors);
  const { t } = useTranslation('profile');
  const { id } = useParams<{ id: string }>();

  const translationsValidationErrors = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Пожалуйста заполните все поля'),
    [ValidateProfileError.INCORRECT_USER_AGE]: t('Вы ввели некорректный возраст'),
    [ValidateProfileError.NO_DATA]: t('данные не указаны'),
  };

  if (__PROJECT__ !== 'storybook') {
    useEffect(() => {
      if (!id) {
        return;
      }

      dispatch(fetchProfileData(id));
      store.reducerManager.add('profile', profileReducer);
      dispatch({ type: `@INIT test reducer` });
      return () => {
        store.reducerManager.remove('profile');
        dispatch({ type: `@DESTROY test reducer` });
      };
    }, [dispatch]);
  }

  const onChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || '' }));
    },
    [dispatch]
  );

  const onChangeLastName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }));
    },
    [dispatch]
  );
  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: value || '' }));
    },
    [dispatch]
  );
  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }));
    },
    [dispatch]
  );
  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }));
    },
    [dispatch]
  );
  const onChangeUserName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }));
    },
    [dispatch]
  );
  const onChangeCurrency = useCallback(
    (value?: Currency) => {
      dispatch(profileActions.updateProfile({ currency: value }));
    },
    [dispatch]
  );
  const onChangeCountry = useCallback(
    (value?: Country) => {
      dispatch(profileActions.updateProfile({ country: value }));
    },
    [dispatch]
  );

  return (
    <div>
      <ProfilePageHeader />
      {errors &&
        errors.map((err) => (
          <Text key={err} theme={TextTheme.ERROR} text={translationsValidationErrors[err]} />
        ))}
      <ProfileCard
        data={formData}
        error={error}
        isLoading={isLoading}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeUserName={onChangeUserName}
        onChangeAvatar={onChangeAvatar}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
        readonly={readonly}
      />
    </div>
  );
};

export default ProfilePage;
