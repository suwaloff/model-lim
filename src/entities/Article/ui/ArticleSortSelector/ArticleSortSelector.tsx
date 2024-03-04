import { classNames } from 'shared/lib/classNames/classNames';
import { Select, SelectOption } from 'shared/ui/select/Select';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
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
  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
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
  const sortOptions = useMemo<SelectOption<ArticleSortField>[]>(
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

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <Select<ArticleSortField>
        label={t('Сортировать по')}
        options={sortOptions}
        value={sort}
        onChange={onChangeSort}
      />
      <Select<SortOrder>
        label={t('По')}
        options={orderOptions}
        value={order}
        onChange={onChangeOrder}
      />
    </div>
  );
};
