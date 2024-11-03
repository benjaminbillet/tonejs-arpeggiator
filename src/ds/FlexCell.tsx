import React from 'react';
import clsx from 'clsx';

import styles from './FlexCell.module.css';

export function FlexCell({ children, orientation, className, stretch }: any) {
  const fullClassName = clsx(
    styles.cell,
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    stretch ? styles.stretch : null,
    className,
  );

  return <div className={fullClassName}>{children}</div>;
}
