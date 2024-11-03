import React from 'react';
import clsx from 'clsx';

import styles from './RadioPicker.module.css';

export interface RadioPickerProps {
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  value: string;
  name: string;
  containerClassName?: string | null;
  labelClassName?: string | null;
  inputClassName?: string | null;
  orientation?: 'horizontal' | 'vertical';
  legend?: React.ReactNode;
}

export function RadioPicker({
  onChange,
  options,
  value,
  name,
  containerClassName = null,
  labelClassName = null,
  inputClassName = null,
  orientation = 'horizontal',
  legend = null,
}: RadioPickerProps) {
  const optionComponents = options.map(option => (
    <label key={option.value} className={clsx(styles.label, labelClassName)}>
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={option.value === value}
        onChange={e => onChange(e.target.value)}
        className={clsx(styles.input, inputClassName)}
      />
      {option.label}
    </label>
  ));

  const className = clsx(
    styles.container,
    orientation === 'vertical' ? styles.vertical : styles.horizontal,
    containerClassName,
  );
  return (
    <div className={className}>
      {legend}
      {optionComponents}
    </div>
  );
}
