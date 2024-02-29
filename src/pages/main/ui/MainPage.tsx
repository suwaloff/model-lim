import { Counter } from 'entities/Counter';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/page/Page';

const MainPage = memo(() => {
  const { t } = useTranslation('main');
  return (
    <Page>
      {t('Главная страница')}
      <Counter />
    </Page>
  );
});

export default MainPage;
