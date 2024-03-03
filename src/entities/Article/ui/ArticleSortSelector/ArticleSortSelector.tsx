import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/select/Select';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { ArticleSortField } from 'entities/Article/model/types/Article';
import { SortOrder } from 'shared/types';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
  const { className, order, sort, onChangeSort, onChangeOrder } = props;
  const { t } = useTranslation('article-details');
  const orderOptions = useMemo<SelectOption[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    []
  );
  const sortOptions = useMemo<SelectOption[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('дате создания'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('просмотрам'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('названию'),
      },
    ],
    []
  );

  const changeSortHandler = useCallback(
    (newSort?: string) => {
      onChangeSort(newSort as ArticleSortField);
    },
    [onChangeSort]
  );
  const changeOrderHandler = useCallback(
    (newOrder?: string) => {
      onChangeOrder(newOrder as SortOrder);
    },
    [onChangeOrder]
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select
        label={t('Сортировать по')}
        options={sortOptions}
        value={sort}
        onChange={changeSortHandler}
      />

      <Select label={t('По')} options={orderOptions} value={sort} onChange={changeOrderHandler} />
    </div>
  );
};
