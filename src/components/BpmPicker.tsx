import React from 'react';
import { useAtom } from 'jotai';

import { arpeggiatorService } from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { Slider } from '../ds/Slider';
import styles from './BpmPicker.module.css';

export function BpmPicker() {
  const [bpm] = useAtom(arpeggiatorState.bpm);

  return (
    <Slider
      min={45}
      max={145}
      step={5}
      orientation="horizontal"
      value={bpm}
      onChange={value => arpeggiatorService.setBpm(value)}
      sliderClassName={styles.container}
      marks={{
        45: <span className={styles.mark}>45 bpm</span>,
        145: <span className={styles.mark}>145 bpm</span>,
      }}
    />
  );
}
