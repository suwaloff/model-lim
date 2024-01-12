import { AppLink, AppLinkTheme } from 'shared/ui/appLink/AppLink';
import { SidebarItemType } from './../model/items';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  return (
    <AppLink
      theme={AppLinkTheme.PRIMARY}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      to={item.path}
    >
      <item.icon className={cls.icon} />
      <span className={cls.link}> {item.text} </span>
    </AppLink>
  );
});
