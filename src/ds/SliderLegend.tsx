import React from 'react';

import styles from './SliderLegend.module.css';

export interface SliderLegendProps {
  min: string;
  max: string;
}

export function SliderLegend({ min, max }: SliderLegendProps) {
  return (
    <div className={styles.legend}>
      <div className={styles.track}></div>
      <div className={styles.marks}>
        <div className={styles.topMark}>{max}</div>
        <div className={styles.bottomMark}>{min}</div>
      </div>
    </div>
  );
}
