import React from 'react';
import { useAtom } from 'jotai';

import * as arpeggiatorActions from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { Legend } from '../ds/Legend';
import { SliderLegend } from '../ds/SliderLegend';
import { VerticalSlider } from '../ds/VerticalSlider';
import styles from './ProgressionPicker.module.css';

export function ProgressionPicker() {
  const [progressionSequence] = useAtom(arpeggiatorState.progressionSequence);
  const currentScale = arpeggiatorActions.getCurrentScale();

  const sliders = progressionSequence.map((chordType, index) => {
    return (
      <VerticalSlider
        key={index}
        min={0}
        max={6}
        step={1}
        formatValue={x => currentScale[x]}
        value={chordType}
        onChange={value => arpeggiatorActions.updateProgression(index, value)}
      />
    );
  });

  return (
    <div>
      <Legend className={styles.legend}>Progression</Legend>
      <div className={styles.sliders}>
        {' '}
        {sliders}
        <SliderLegend min={currentScale[0]} max={currentScale[currentScale.length - 1]} />
      </div>
    </div>
  );
}

export default ProgressionPicker;
