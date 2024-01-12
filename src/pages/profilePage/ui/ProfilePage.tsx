import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { profileReducer } from 'entities/Profile';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useAppDispatch();

  useEffect(() => {
    store.reducerManager.add('profile', profileReducer);
    dispatch({ type: `@INIT test reducer` });
    return () => {
      store.reducerManager.remove('profile');
      dispatch({ type: `@DESTROY test reducer` });
    };
  }, []);

  return <div>{t('Профиль')}</div>;
};

export default ProfilePage;
