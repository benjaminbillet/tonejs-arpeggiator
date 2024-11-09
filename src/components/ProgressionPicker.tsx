import React from 'react';
import { useAtom } from 'jotai';

import * as arpeggiatorActions from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { FlexCell } from '../ds/FlexCell';
import { Legend } from '../ds/Legend';
import { OnOffButton } from '../ds/OnOffButton';
import { Slider } from '../ds/Slider';
import { SliderLegend } from '../ds/SliderLegend';
import styles from './ProgressionPicker.module.css';

export function ProgressionPicker() {
  const [progressionSequence] = useAtom(arpeggiatorState.progressionSequence);
  const [progressionEnabled] = useAtom(arpeggiatorState.progressionEnabled);
  const [currentProgression] = useAtom(arpeggiatorState.currentProgression);

  const currentScale = arpeggiatorActions.getCurrentScale();

  const sliders = progressionSequence.map((chordType, index) => {
    console.log(progressionEnabled, index, currentProgression);
    return (
      <Slider
        key={index}
        min={0}
        max={6}
        step={1}
        orientation="vertical"
        formatValue={x => currentScale[x]}
        value={chordType}
        onChange={value => arpeggiatorActions.updateProgression(index, value)}
        handleClassName={
          progressionEnabled && index === currentProgression ? styles.activeSlider : null
        }
      />
    );
  });

  return (
    <div>
      <FlexCell orientation="horizontal" justifyContent="center">
        <Legend className={styles.legend}>Progression</Legend>
        <OnOffButton
          value={progressionEnabled}
          onChange={value => arpeggiatorActions.setProgressionEnabled(value)}
        />
      </FlexCell>
      <div className={styles.sliders}>
        {sliders}
        <SliderLegend min={currentScale[0]} max={currentScale[currentScale.length - 1]} />
      </div>
    </div>
  );
}
