import React from 'react';
import clsx from 'clsx';

import styles from './FlexCell.module.css';

interface FlexCellProps {
  orientation: 'horizontal' | 'vertical';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignContent?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  children: React.ReactNode;
  className?: string;
  stretch?: boolean;
}

export function FlexCell({
  children,
  orientation,
  className,
  justifyContent,
  alignContent,
  alignItems,
  stretch = false,
}: FlexCellProps) {
  const fullClassName = clsx(
    styles.cell,
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    justifyContent ? styles[`justify-content-${justifyContent}`] : null,
    alignContent ? styles[`align-content-${alignContent}`] : null,
    alignItems ? styles[`align-items-${alignItems}`] : null,
    stretch ? styles[`stretch-${orientation}`] : null,
    className,
  );

  return <div className={fullClassName}>{children}</div>;
}
