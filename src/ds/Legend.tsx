import React from 'react';
import clsx from 'clsx';

import styles from './Legend.module.css';

export interface LegendProps {
  className?: string | null;
  children: React.ReactNode;
}

export function Legend({ children, className = null }: LegendProps) {
  return <div className={clsx([styles.legend, className])}>{children}</div>;
}
