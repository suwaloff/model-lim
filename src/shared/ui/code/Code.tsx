import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { ButtonTHeme, Button } from 'shared/ui/button';
import { Highlight, themes } from 'prism-react-renderer';
import CopySvg from 'shared/assets/icons/article-icon/copy.svg';
import cls from './Code.module.scss';

interface CodeProps {
  className?: string;
  children: string;
}

export const Code = (props: CodeProps) => {
  const { children, className } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
  }, [children]);

  return (
    <div className={classNames(cls.Code, {}, [className])}>
      <Button onClick={onCopy} className={cls.copyBtn} theme={ButtonTHeme.CLEAR}>
        <CopySvg className={cls.copySvg} />
      </Button>
      <Highlight theme={themes.duotoneDark} code={children} language="js">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
