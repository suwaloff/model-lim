import { AppLink, AppLinkTheme } from 'shared/ui/appLink/AppLink';
import { SidebarItemType } from '../model/types/sidebar';
import { getUserAuthData } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.PRIMARY}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      to={item.path}
    >
      <item.icon className={cls.icon} />
      <span className={cls.link}> {t(item.text)} </span>
    </AppLink>
  );
});
