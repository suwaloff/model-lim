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
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { getProfileForm } from 'entities/Profile/model/selectors/getProfileForm/getProfileForm';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const formData = useSelector(getProfileForm);

  useEffect(() => {
    dispatch(fetchProfileData());
    store.reducerManager.add('profile', profileReducer);
    dispatch({ type: `@INIT test reducer` });
    return () => {
      store.reducerManager.remove('profile');
      dispatch({ type: `@DESTROY test reducer` });
    };
  }, []);

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

  return (
    <div>
      <ProfilePageHeader />
      <ProfileCard
        data={formData}
        error={error}
        isLoading={isLoading}
        onChangeFirstName={onChangeFirstName}
        onChangeLastName={onChangeLastName}
        readonly={readonly}
      />
    </div>
  );
};

export default ProfilePage;
