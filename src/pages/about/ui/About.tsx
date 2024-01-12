import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const About = memo(() => {
  const { t } = useTranslation('about');

  return <div>{t('о сайте')}</div>;
});

export default About;
