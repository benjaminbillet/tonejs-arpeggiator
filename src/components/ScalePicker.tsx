import React from 'react';
import { useAtom } from 'jotai';

import { SCALES_DATA } from '../domains/arpeggiator/arpeggiator.constant';
import { arpeggiatorService } from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { getLabelForScaleChord } from '../domains/arpeggiator/helpers/getLabelForScaleChord';
import { Legend } from '../ds/Legend';
import { RadioPicker } from '../ds/RadioPicker';
import styles from './ScalePicker.module.css';

export function ScalePicker() {
  const [scaleChord] = useAtom(arpeggiatorState.scaleChord);
  const [mode] = useAtom(arpeggiatorState.mode);

  const scaleOptions = SCALES_DATA[mode].triads.map((key, index) => ({
    label: getLabelForScaleChord(index, key),
    value: `${index}`,
  }));

  return (
    <RadioPicker
      legend={<Legend className={styles.legend}>Scale</Legend>}
      orientation="horizontal"
      options={scaleOptions}
      value={`${scaleChord}`}
      onChange={s => arpeggiatorService.setScaleChord(parseInt(s))}
      name="scale"
      labelClassName={styles.radioLabel}
      containerClassName={styles.radioContainer}
    />
  );
}
