import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';

const About = memo(() => {
  const { t } = useTranslation('about');

  return <Page>{t('о сайте')}</Page>;
});

export default About;
