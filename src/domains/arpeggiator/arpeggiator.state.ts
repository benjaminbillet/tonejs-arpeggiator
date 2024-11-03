import { atom } from 'jotai';

import { Keys, Note, Scales } from './arpeggiator.type';

export const activeNotes = atom<Note[]>([]);
export const mode = atom<Scales>('ionian');
export const fundamental = atom<Keys>('C');
export const loop = atom(false);
export const bpm = atom(60);
export const scaleChord = atom(0);
export const sequence = atom([0, 1, 2, 3, 4, 5]);

export const progressionEnabled = atom(true);
export const progressionSequence = atom([0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0]);
export const currentProgression = atom(0);
