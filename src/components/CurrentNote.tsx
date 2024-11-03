import React from 'react';
import { useAtom } from 'jotai';

import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import styles from './CurrentNote.module.css';

export function CurrentNote() {
  const [activeNotes] = useAtom(arpeggiatorState.activeNotes);

  return <div className={styles.note}>{activeNotes?.[0] ?? '∅'}</div>;
}
