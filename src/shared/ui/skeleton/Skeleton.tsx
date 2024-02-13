import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import { CSSProperties } from 'react';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

const Skeleton = (props: SkeletonProps) => {
  const { className, border, height, width } = props;
  const styles: CSSProperties = {
    height,
    width,
    borderRadius: border,
  };
  return <div className={classNames(cls.Skeleton, {}, [className])} style={styles} />;
};

export default Skeleton;
