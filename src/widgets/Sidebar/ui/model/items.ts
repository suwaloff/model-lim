import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import InfoIcon from 'shared/assets/icons/info-circle.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile-icon.svg';
import Article from 'shared/assets/icons/article.svg';

export interface SidebarItemType {
  path: string;
  text: string;
  icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  authOnly?: boolean;
}

export const SidebarElements: SidebarItemType[] = [
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
    path: RoutePath.profile,
    text: 'Профиль',
    icon: ProfileIcon,
    authOnly: true,
  },
];
