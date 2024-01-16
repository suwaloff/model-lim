import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Portal } from '../portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
  const { children, className, isOpen, onClose, lazy } = props;
  const [isClosing, setIsClosing] = useState(false);
  const timeref = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeref.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 100);
    }
  }, [onClose]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeref.current);
    };
  }, []);

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
