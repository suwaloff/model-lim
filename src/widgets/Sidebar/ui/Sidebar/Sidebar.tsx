import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { Button, ButtonSize, ButtonTHeme } from 'shared/ui/button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { getSideBarItems } from '../model/selectors/getSideBarItems';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarElements = useSelector(getSideBarItems);

  const collapsedSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <div className={cls.items}>
        {sidebarElements.map((item) => (
          <SidebarItem item={item} key={item.path} collapsed={collapsed} />
        ))}
      </div>
      <Button
        data-testid="btn-collapsed"
        className={cls.colapseButton}
        theme={ButtonTHeme.BACKGROUND_INVERTED}
        onClick={collapsedSidebar}
        size={ButtonSize.L}
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
    </div>
  );
});
