import React from 'react';
import { useAtom } from 'jotai';

import * as arpeggiatorActions from '../domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { RadioPicker } from '../ds/RadioPicker';

const loopOptions = [
  { label: 'no loop', value: 'no-loop' },
  { label: 'loop', value: 'loop' },
];

export function LoopToggle() {
  const [loop] = useAtom(arpeggiatorState.loop);

  return (
    <RadioPicker
      options={loopOptions}
      value={loop ? 'loop' : 'no-loop'}
      onChange={s => arpeggiatorActions.setLoop(s === 'loop')}
      name="loop"
    />
  );
}
