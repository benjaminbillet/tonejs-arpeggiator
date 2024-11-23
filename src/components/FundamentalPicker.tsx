import React from 'react';
import { useAtom } from 'jotai';

import { KEYS } from '../domains/arpeggiator/arpeggiator.constant';
import { arpeggiatorService } from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { Keys } from '../domains/arpeggiator/arpeggiator.type';
import { Legend } from '../ds/Legend';
import { RadioPicker } from '../ds/RadioPicker';

const keysOptions = KEYS.map(key => ({ label: key, value: key }));

export function FundamentalPicker() {
  const [fundamental] = useAtom(arpeggiatorState.fundamental);

  return (
    <RadioPicker
      legend={<Legend>Fundamental</Legend>}
      orientation="vertical"
      options={keysOptions}
      value={fundamental}
      onChange={f => arpeggiatorService.setFundamental(f as Keys)}
      name="fundamental"
    />
  );
}
