import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponent.module.scss';
import { Code } from 'shared/ui/code/Code';
import { ArticleCodeBlock } from 'entities/Article/model/types/Article';

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = (props: ArticleCodeBlockComponentProps) => {
  const { className, block } = props;
  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code>{block.code}</Code>
    </div>
  );
};
