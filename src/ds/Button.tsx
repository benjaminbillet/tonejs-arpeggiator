import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.css';

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
}
