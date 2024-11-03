import React from 'react';
import ReactSlider from 'react-slider';
import { clsx } from 'clsx';

import styles from './HorizontalSlider.module.css';

export interface HorizontalSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

function ThumbTooltip({ value, visible }: { value: number; visible: boolean }) {
  return (
    <>
      <div className={styles.thumbTick}></div>
      <div className={clsx(styles.tooltip, visible ? null : styles.hidden)}>{value}</div>
    </>
  );
}

export function HorizontalSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
}: HorizontalSliderProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <ReactSlider
      min={min}
      max={max}
      step={step}
      orientation="horizontal"
      className={styles.horizontalSlider}
      trackClassName={styles.track}
      thumbClassName={styles.thumb}
      markClassName={styles.mark}
      renderThumb={({ key, ...props }, state) => (
        <div key={key} {...props}>
          <ThumbTooltip value={state.valueNow} visible={showTooltip} />
        </div>
      )}
      value={value}
      onChange={onChange}
      onBeforeChange={() => setShowTooltip(true)}
      onAfterChange={() => setShowTooltip(false)}
    />
  );
}
