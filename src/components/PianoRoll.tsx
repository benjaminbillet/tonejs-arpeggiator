import React from 'react';
import { useAtom } from 'jotai';

import { KEYS } from '../domains/arpeggiator/arpeggiator.constant';
import * as arpeggiatorState from '../domains/arpeggiator/arpeggiator.state';
import { Note } from '../domains/arpeggiator/arpeggiator.type';
import styles from './PianoRoll.module.css';

export interface PianoRollProps {
  octaves?: number[];
  activeNotes?: Note[];
}

function PianoKey({ note, active }: { note: Note; active: boolean }) {
  let className = styles.key;
  if (note.indexOf('#') >= 0) {
    className = styles.sharpKey;
  }

  if (active) {
    className = [className, styles.selectedKey].join(' ');
  }

  return <div className={className} />;
}

export function PianoRoll({ octaves = [2, 3, 4, 5, 6, 7] }: PianoRollProps) {
  const [activeNotes] = useAtom(arpeggiatorState.activeNotes);

  const pianoKeys = octaves.flatMap(octave => {
    return KEYS.map(key => {
      const note: Note = `${key}${octave}`;
      const isActive = activeNotes.includes(note);
      return <PianoKey key={note} note={note} active={isActive} />;
    });
  });

  return <div className={styles.pianoroll}>{pianoKeys}</div>;
}
