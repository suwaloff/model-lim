import { User } from 'entities/User';

export enum ArticleBlockType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  CODE = 'CODE',
}

export enum ArticleSortField {
  TITLE = 'title',
  VIEWS = 'views',
  CREATED = 'created',
}

export interface ArticleBaseBlock {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleTextBlock extends ArticleBaseBlock {
  type: ArticleBlockType.TEXT;
  title?: string;
  paragraphs: string[];
}
export interface ArticleImageBlock extends ArticleBaseBlock {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}
export interface ArticleCodeBlock extends ArticleBaseBlock {
  type: ArticleBlockType.CODE;
  code: string;
}

export type ArticleBlock = ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock;

export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
}

export enum ArticleView {
  BIG = 'BIG',
  SMALL = 'SMALL',
}

export interface Article {
  id: string;
  userId: User;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
