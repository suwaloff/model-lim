import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { Card, CardTheme } from '../card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  value: string;
  tabs: TabItem[];
  onTabClick: (tab: TabItem) => void;
}

export const Tabs = (props: TabsProps) => {
  const { className, onTabClick, tabs, value } = props;
  const clickHandle = (tab: TabItem) => {
    return () => {
      onTabClick(tab);
    };
  };

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          className={cls.tab}
          theme={tab.value === value ? CardTheme.OUTLINED : CardTheme.NORMAL}
          key={tab.value}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
};
