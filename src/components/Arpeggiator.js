import { observable, action, computed } from 'mobx';

export const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALE_CHORDS = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

export const CHORD_INTERVALS = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
};

export const SCALES = {
  ionian: {
    label: 'Ionian',
    steps: [
      0,
      2,
      4,
      5,
      7,
      9,
      11,
    ],
    triads: [
      'maj',
      'min',
      'min',
      'maj',
      'maj',
      'min',
      'dim',
    ],
  },
  dorian: {
    label: 'Dorian',
    steps: [
      0,
      2,
      3,
      5,
      7,
      9,
      10,
    ],
    triads: [
      'min',
      'min',
      'maj',
      'maj',
      'min',
      'dim',
      'maj',
    ],
  },
  phrygian: {
    label: 'Phrygian',
    steps: [
      0,
      1,
      3,
      5,
      7,
      8,
      10,
    ],
    triads: [
      'min',
      'maj',
      'maj',
      'min',
      'dim',
      'maj',
      'min',
    ],
  },
  lydian: {
    label: 'Lydian',
    steps: [
      0,
      2,
      4,
      6,
      7,
      9,
      11,
    ],
    triads: [
      'maj',
      'maj',
      'min',
      'dim',
      'maj',
      'min',
      'min',
    ],
  },
  mixolydian: {
    label: 'Myxolydian',
    steps: [
      0,
      2,
      4,
      5,
      7,
      9,
      10,
    ],
    triads: [
      'maj',
      'min',
      'dim',
      'maj',
      'min',
      'min',
      'maj',
    ],
  },
  aeolian: {
    label: 'Aeolian',
    steps: [
      0,
      2,
      3,
      5,
      7,
      8,
      10,
    ],
    triads: [
      'min',
      'dim',
      'maj',
      'min',
      'min',
      'maj',
      'maj',
    ],
  },
  locrian: {
    label: 'Locrian',
    steps: [
      0,
      1,
      3,
      5,
      6,
      8,
      10,
    ],
    triads: [
      'dim',
      'maj',
      'min',
      'min',
      'maj',
      'maj',
      'min',
    ],
  },
  melodic: {
    label: 'Melodic Minor',
    steps: [
      0,
      2,
      3,
      5,
      7,
      9,
      11,
    ],
    triads: [
      'min',
      'min',
      'aug',
      'maj',
      'maj',
      'dim',
      'dim',
    ],
  },
  harmonic: {
    label: 'Harmonic Minor',
    steps: [
      0,
      2,
      3,
      5,
      7,
      8,
      11,
    ],
    triads: [
      'min',
      'dim',
      'aug',
      'min',
      'maj',
      'maj',
      'dim',
    ],
  },
};

const computeTriad = (mode, scaleChordIdx, fundamental) => {
  const offset = KEYS.indexOf(fundamental);
  const step = SCALES[mode].steps[scaleChordIdx];
  const chordType = SCALES[mode].triads[scaleChordIdx];
  const baseNoteIdx = (offset + step) % KEYS.length;

  let octaveUp = 0;
  if (offset + step > KEYS.length) {
    octaveUp = 1;
  }

  const intervals = CHORD_INTERVALS[chordType];
  const notes = intervals.map((interval) => {
    const noteIdx = (baseNoteIdx + interval) % KEYS.length;
    return KEYS[noteIdx];
  });
  return { notes, octaveUp };
};

const expandChordToArpeggio = (chordNotes, size = 6, baseOctave = 4) => {
  const arpeggio = [];
  let previousNoteIdx = -1;
  let octave = baseOctave;
  for (let i = 0; i < size; i += 1) {
    const note = chordNotes[i % chordNotes.length];
    if (KEYS.indexOf(note) < previousNoteIdx) {
      octave += 1;
    }

    arpeggio.push(note + octave);
    previousNoteIdx = KEYS.indexOf(note);
  }
  return arpeggio;
};

const computeCache = (baseOctave = 4) => {
  const result = {};
  Object.keys(SCALES).forEach((mode) => {
    result[mode] = {};
    SCALES[mode].triads.forEach((_, scaleChordIdx) => {
      result[mode][scaleChordIdx] = {};
      KEYS.forEach((fundamental) => {
        result[mode][scaleChordIdx][fundamental] = {};
        for (let i = 3; i <= 6; i += 1) {
          const { notes, octaveUp } = computeTriad(mode, scaleChordIdx, fundamental);
          const arpeggio = expandChordToArpeggio(notes, i, octaveUp + baseOctave);
          result[mode][scaleChordIdx][fundamental][i] = arpeggio;
        }
      });
    });
  });
  return result;
};

const scaleChordToLabel = (scaleChordIdx, triadType) => {
  const s = SCALE_CHORDS[scaleChordIdx];
  switch (triadType) {
    case 'maj':
      return s.toUpperCase();
    case 'min':
      return s;
    case 'aug':
      return `${s.toUpperCase()}+`;
    case 'dim':
      return `${s}°`;
    default:
      throw new Error('unknow triadType');
  }
};


export default class Arpeggiator {
  @observable
  mode = 'ionian';

  @observable
  scaleChord = 0;

  @observable
  fundamental = 'C';

  @observable
  size = 6;

  @observable
  loop = false

  @observable
  sequence = [0, 1, 2, 3, 4, 5]

  constructor(mode = 'ionian', scaleChord = 0, fundamental = 'C', size = 6, loop = false, sequence = [0, 1, 2, 3, 4, 5]) {
    this.mode = mode;
    this.scaleChord = scaleChord;
    this.fundamental = fundamental;
    this.size = size;
    this.loop = loop;
    this.sequence = sequence;

    this.cache = computeCache();
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

  @action
  setLoop(loop) {
    this.loop = loop;
  }

  @action
  changeOrder(index, order) {
    this.sequence[index] = order;
  }

  @computed
  get currentScale() {
    const { triads } = SCALES[this.mode];
    return triads.map((chordType, index) => scaleChordToLabel(index, chordType));
  }

  computeArpeggio() {
    this.arpeggio = this.cache[this.mode][this.scaleChord][this.fundamental][this.size];
    return this.arpeggio;
  }

  getArpegio() {
    return this.arpeggio;
  }
}
