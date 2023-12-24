import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/appLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button, ButtonSize, ButtonTHeme } from 'shared/ui/button';
import { useTranslation } from 'react-i18next';
import InfoIcon from 'shared/assets/icons/info-circle.svg';
import MainIcon from 'shared/assets/icons/main-icon.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

  const collapsedSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <div className={cls.items}>
        <AppLink theme={AppLinkTheme.PRIMARY} className={cls.item} to={RoutePath.main}>
          <MainIcon className={cls.icon} />
          <span className={cls.link}> {t('Главная')} </span>
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} className={cls.item} to={RoutePath.about}>
          <InfoIcon className={cls.icon} />
          <span className={cls.link}>{t('О сайте')} </span>
        </AppLink>
      </div>
      <Button
        data-testid="btn-collapsed"
        className={cls.colapseButton}
        theme={ButtonTHeme.BACKGROUND_INVERTED}
        onClick={collapsedSidebar}
        size={ButtonSize.XL}
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
    </div>
  );
};
