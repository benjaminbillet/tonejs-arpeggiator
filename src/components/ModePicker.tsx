import React from 'react';
import { useAtom } from 'jotai';

import { SCALES_DATA } from '../domains/arpeggiator/arpeggiator.constant';
import { arpeggiatorService } from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { Scales } from '../domains/arpeggiator/arpeggiator.type';
import { Legend } from '../ds/Legend';
import { RadioPicker } from '../ds/RadioPicker';

const scalesOptions = Object.entries(SCALES_DATA).map(([key, scale]) => ({
  label: scale.label,
  value: key,
}));

export function ModePicker() {
  const [mode] = useAtom(arpeggiatorState.mode);

  return (
    <RadioPicker
      legend={<Legend>Mode</Legend>}
      orientation="vertical"
      options={scalesOptions}
      value={mode}
      onChange={m => arpeggiatorService.setMode(m as Scales)}
      name="mode"
    />
  );
}
