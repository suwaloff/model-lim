import { Article } from './Article';

export interface ArticleDetailsShema {
  data?: Article;
  error?: string;
  isLoading?: boolean;
}
