import { CHORD_INTERVALS, KEYS, SCALE_CHORDS, SCALES } from './arpeggiator.constant';

export type Keys = (typeof KEYS)[number];
export type ScaleChords = (typeof SCALE_CHORDS)[number];
export type Scales = (typeof SCALES)[number];
export type ChordIntervals = keyof typeof CHORD_INTERVALS;
export type Note = `${Keys}${number}`;
