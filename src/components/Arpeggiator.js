import { observable, action } from 'mobx';

export const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const chordIntervals = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
};

export const SCALES = {
  ionian: {
    label: 'Ionian',
    steps: {
      i: 0,
      ii: 2,
      iii: 4,
      iv: 5,
      v: 7,
      vi: 9,
      vii: 11,
    },
    triads: {
      i: 'maj',
      ii: 'min',
      iii: 'min',
      iv: 'maj',
      v: 'maj',
      vi: 'min',
      vii: 'dim',
    },
  },
  dorian: {
    label: 'Dorian',
    steps: {
      i: 0,
      ii: 2,
      iii: 3,
      iv: 5,
      v: 7,
      vi: 9,
      vii: 10,
    },
    triads: {
      i: 'min',
      ii: 'min',
      iii: 'maj',
      iv: 'maj',
      v: 'min',
      vi: 'dim',
      vii: 'maj',
    },
  },
};

export const computeTriad = (mode, scaleChord, fundamental) => {
  const offset = KEYS.indexOf(fundamental);
  const step = SCALES[mode].steps[scaleChord];
  const chordType = SCALES[mode].triads[scaleChord];
  let noteIdx = (offset + step) % KEYS.length;

  const intervals = chordIntervals[chordType];
  const notes = [];
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const noteIdx2 = (noteIdx + interval) % KEYS.length;
    notes.push(KEYS[noteIdx2]);
  }
  return notes;
};

export const expandChordToArpeggio = (chordNotes, size = 6, baseOctave = 4) => {
  const arpeggio = [];
  let previousNoteIdx = -1;
  let octave = baseOctave;
  for (let i = 0; i < size; i++) {
    const note = chordNotes[i % chordNotes.length];
    if (KEYS.indexOf(note) < previousNoteIdx) {
      octave += 1;
    }

    arpeggio.push(note + octave);
    previousNoteIdx = KEYS.indexOf(note);
  }
  return arpeggio;
};

export default class Arpeggiator {
  @observable
  mode = 'ionian';

  @observable
  scaleChord = 'i';

  @observable
  fundamental = 'C';

  @observable
  size = 6;

  constructor(mode = 'ionian', scaleChord = 'i', fundamental = 'C', size = 6) {
    this.mode = mode;
    this.scaleChord = scaleChord;
    this.fundamental = fundamental;
    this.size = size;
    this.computeArpeggio();
  }

  @action
  setMode(mode) {
    this.mode = mode;
    this.computeArpeggio();
  }

  @action
  setScaleChord(scaleChord) {
    this.scaleChord = scaleChord;
    this.computeArpeggio();
  }

  @action
  setFundamental(fundamental) {
    this.fundamental = fundamental;
    this.computeArpeggio();
  }

  computeArpeggio() {
    const chordNotes = computeTriad(this.mode, this.scaleChord, this.fundamental);
    this.arpeggio = expandChordToArpeggio(chordNotes, this.size);
    return this.arpeggio;
  }

  getArpegio() {
    return this.arpeggio;
  }
}
