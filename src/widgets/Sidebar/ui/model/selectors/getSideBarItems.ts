import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SidebarItemType } from '../types/sidebar';
import InfoIcon from 'shared/assets/icons/info-circle.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import Article from 'shared/assets/icons/article.svg';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarElements: SidebarItemType[] = [
    {
      path: RoutePath.main,
      text: 'Главная',
      icon: MainIcon,
    },
    {
      path: RoutePath.articles,
      text: 'Статьи',
      icon: Article,
    },
    {
      path: RoutePath.about,
      text: 'О сайте',
      icon: InfoIcon,
    },
    {
      path: RoutePath.profile + userData?.id,
      text: 'Профиль',
      icon: ProfileIcon,
      authOnly: true,
    },
  ];
  return sidebarElements;
});
