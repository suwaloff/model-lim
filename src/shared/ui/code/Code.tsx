import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import cls from './Code.module.scss';
import { Button } from '../button';

interface CodeProps {
  className?: string;
  children: ReactNode;
}

export const Code = (props: CodeProps) => {
  const { children, className } = props;
  hljs.registerLanguage('javascript', javascript);

  useEffect(() => {
    hljs.highlightAll();
  }, [hljs]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn}>копировать</Button>
      <code>{children}</code>
    </pre>
  );
};
