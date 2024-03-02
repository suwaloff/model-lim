import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, UIEvent, memo, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SaveScrollActions, getSaveScrollByPath } from './saveScroll';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children?: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getSaveScrollByPath(state, pathname));

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    dispatch(
      SaveScrollActions.setScrollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      })
    );
  };

  return (
    <main ref={wrapperRef} onScroll={onScroll} className={classNames(cls.Page, {}, [className])}>
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </main>
  );
});
