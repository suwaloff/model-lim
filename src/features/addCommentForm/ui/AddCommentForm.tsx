import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/button';
import { useSelector, useStore } from 'react-redux';
import {
  getCommentFormError,
  getCommentFormText,
} from '../model/selectors/addCommentFormSelectors';
import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { addCommentFormActions, addCommentFormReducer } from '../model/slice/addCommentFormSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { sendComment } from '../model/services/sendComment/sendComment';

export interface AddCommentFormProps {
  className?: string;
}

const AddCommentForm = ({ className }: AddCommentFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const error = useSelector(getCommentFormError);
  const text = useSelector(getCommentFormText);
  const store = useStore() as ReduxStoreWithManager;

  useInitialEffect(() => {
    store.reducerManager.add('addCommentForm', addCommentFormReducer);
    dispatch({ type: `@INIT addCommentForm reducer` });
    return () => {
      store.reducerManager.remove('addCommentForm');
      dispatch({ type: `@DESTROY addCommentForm reducer` });
    };
  });

  const onChange = useCallback(
    (event: ChangeEvent<{ value: string }>) => {
      dispatch(addCommentFormActions.setText(event?.target?.value));
    },
    [dispatch]
  );

  const onSendComment = useCallback(() => {
    dispatch(sendComment());
  }, [dispatch]);

  return (
    <div className={classNames(cls.AddCommentForm, {}, [className])}>
      <input
        type="text"
        onChange={onChange}
        value={text}
        placeholder={t('Введите комментарий')}
        className={cls.input}
      />
      <Button onClick={onSendComment}>{t('Отправить')}</Button>
    </div>
  );
};

export default AddCommentForm;
