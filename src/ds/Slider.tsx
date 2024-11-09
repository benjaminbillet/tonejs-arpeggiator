import React from 'react';
import { Slider as AntdSlider } from 'antd';
import { clsx } from 'clsx';

import styles from './Slider.module.css';

const safeFormatter = (formatter: (value: number) => React.ReactNode) => (value?: number) => {
  if (value != null) {
    return formatter(value);
  }
  return null;
};

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  orientation?: 'vertical' | 'horizontal';
  onChange?: (value: number) => void;
  formatValue?: (value: number) => string;
  handleClassName?: string;
  sliderClassName?: string;
  railClassName?: string;
  trackClassName?: string;
  marks?: { [key: number]: React.ReactNode };
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  orientation = 'horizontal',
  onChange = () => {},
  formatValue,
  handleClassName,
  sliderClassName,
  railClassName,
  trackClassName,
  marks,
}: SliderProps) {
  const formatterProps = formatValue ? { formatter: safeFormatter(formatValue) } : {};

  return (
    <AntdSlider
      min={min}
      max={max}
      step={step}
      vertical={orientation === 'vertical'}
      onChange={onChange}
      value={value}
      tooltip={formatterProps}
      className={sliderClassName}
      classNames={{
        rail: clsx(styles.rail, railClassName),
        track: clsx(styles.track, trackClassName),
        handle: clsx(styles.handle, handleClassName),
      }}
      marks={marks}
    />
  );
}
