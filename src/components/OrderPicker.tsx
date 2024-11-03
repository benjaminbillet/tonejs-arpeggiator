import React from 'react';
import { useAtom } from 'jotai';

import * as arpeggiatorActions from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { Legend } from '../ds/Legend';
import { SliderLegend } from '../ds/SliderLegend';
import { VerticalSlider } from '../ds/VerticalSlider';
import styles from './OrderPicker.module.css';

export function OrderPicker() {
  const [sequence] = useAtom(arpeggiatorState.sequence);
  const arpeggio = arpeggiatorActions.getArpeggio();

  const sliders = sequence.map((seqValue, index) => (
    <VerticalSlider
      key={index}
      min={0}
      max={5}
      step={1}
      formatValue={value => arpeggio[value]}
      value={seqValue}
      onChange={value => arpeggiatorActions.updateNoteOrder(index, value)}
    />
  ));
  return (
    <div className={styles.container}>
      <Legend className={styles.legend}>Note order</Legend>
      <div className={styles.sliders}>
        {sliders}
        <SliderLegend min={arpeggio[0]} max={arpeggio[arpeggio.length - 1]} />
      </div>
    </div>
  );
}

export default OrderPicker;
