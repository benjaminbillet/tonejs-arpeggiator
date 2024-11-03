import React from 'react';
import ReactSlider from 'react-slider';
import { clsx } from 'clsx';

import styles from './VerticalSlider.module.css';

export interface VerticalSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
}

function ThumbTooltip({ value, visible }: { value: string; visible: boolean }) {
  return (
    <>
      <div className={styles.thumbTick}></div>
      <div className={clsx(styles.tooltip, visible ? null : styles.hidden)}>{value}</div>
    </>
  );
}

export function VerticalSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  formatValue = v => v.toString(),
}: VerticalSliderProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <ReactSlider
      min={min}
      max={max}
      step={step}
      orientation="vertical"
      invert
      className={styles.verticalSlider}
      trackClassName={styles.track}
      thumbClassName={styles.thumb}
      markClassName={styles.mark}
      renderThumb={({ key, ...props }, state) => (
        <div key={key} {...props}>
          <ThumbTooltip value={formatValue(state.valueNow)} visible={showTooltip} />
        </div>
      )}
      value={value}
      onChange={onChange}
      onBeforeChange={() => setShowTooltip(true)}
      onAfterChange={() => setShowTooltip(false)}
    />
  );
}
