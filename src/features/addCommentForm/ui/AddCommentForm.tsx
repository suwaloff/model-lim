import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/button';
import { useSelector, useStore } from 'react-redux';
import {
  getCommentFormError,
  getCommentFormText,
} from '../model/selectors/addCommentFormSelectors';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { addCommentFormActions, addCommentFormReducer } from '../model/slice/addCommentFormSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const AddCommentForm = (props: AddCommentFormProps) => {
  const { onSendComment, className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article-details');
  const error = useSelector(getCommentFormError);
  const store = useStore() as ReduxStoreWithManager;
  const text = useSelector(getCommentFormText);

  useInitialEffect(() => {
    store.reducerManager.add('addCommentForm', addCommentFormReducer);
    dispatch({ type: `@INIT addCommentForm reducer` });
    return () => {
      store.reducerManager.remove('addCommentForm');
      dispatch({ type: `@DESTROY addCommentForm reducer` });
    };
  });

  const onCommentTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(addCommentFormActions.setText(event?.target?.value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    dispatch(addCommentFormActions.setText(''));
  }, [dispatch, text, onSendComment]);

  return (
    <div className={classNames(cls.AddCommentForm, {}, [className])}>
      <input
        type="text"
        onChange={onCommentTextChange}
        value={text}
        placeholder={t('Введите комментарий')}
        className={cls.input}
      />
      <Button onClick={onSendHandler}>{t('Отправить')}</Button>
    </div>
  );
};

export default AddCommentForm;
