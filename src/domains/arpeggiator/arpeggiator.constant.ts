export const KEYS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

export const SCALE_CHORDS = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'] as const;

export const SCALES = [
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
  'melodic',
  'harmonic',
] as const;

export const CHORD_INTERVALS = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
} as const;

export const SCALES_DATA = {
  ionian: {
    label: 'Ionian',
    steps: [0, 2, 4, 5, 7, 9, 11],
    triads: ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'],
  },
  dorian: {
    label: 'Dorian',
    steps: [0, 2, 3, 5, 7, 9, 10],
    triads: ['min', 'min', 'maj', 'maj', 'min', 'dim', 'maj'],
  },
  phrygian: {
    label: 'Phrygian',
    steps: [0, 1, 3, 5, 7, 8, 10],
    triads: ['min', 'maj', 'maj', 'min', 'dim', 'maj', 'min'],
  },
  lydian: {
    label: 'Lydian',
    steps: [0, 2, 4, 6, 7, 9, 11],
    triads: ['maj', 'maj', 'min', 'dim', 'maj', 'min', 'min'],
  },
  mixolydian: {
    label: 'Myxolydian',
    steps: [0, 2, 4, 5, 7, 9, 10],
    triads: ['maj', 'min', 'dim', 'maj', 'min', 'min', 'maj'],
  },
  aeolian: {
    label: 'Aeolian',
    steps: [0, 2, 3, 5, 7, 8, 10],
    triads: ['min', 'dim', 'maj', 'min', 'min', 'maj', 'maj'],
  },
  locrian: {
    label: 'Locrian',
    steps: [0, 1, 3, 5, 6, 8, 10],
    triads: ['dim', 'maj', 'min', 'min', 'maj', 'maj', 'min'],
  },
  melodic: {
    label: 'Melodic Minor',
    steps: [0, 2, 3, 5, 7, 9, 11],
    triads: ['min', 'min', 'aug', 'maj', 'maj', 'dim', 'dim'],
  },
  harmonic: {
    label: 'Harmonic Minor',
    steps: [0, 2, 3, 5, 7, 8, 11],
    triads: ['min', 'dim', 'aug', 'min', 'maj', 'maj', 'dim'],
  },
} as const;
