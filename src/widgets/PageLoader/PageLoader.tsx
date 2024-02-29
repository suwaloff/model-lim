import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/loader/Loader';
import cls from './PageLoader.module.scss';
import { Page } from 'shared/ui/page/Page';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <Page className={classNames(cls.PageLoader, {}, [className])}>
      <Loader />
    </Page>
  );
};
