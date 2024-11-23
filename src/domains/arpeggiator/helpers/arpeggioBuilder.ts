import { CHORD_INTERVALS, KEYS, SCALES, SCALES_DATA } from '../arpeggiator.constant';
import { Keys, Note, Scales } from '../arpeggiator.type';

export class ArpeggioBuilder {
  private cache: Dict<Note[]> = {};

  constructor(
    private mode: Scales,
    private scaleChord: number,
    private fundamental: Keys,
    private size: number,
    private sequence: number[],
  ) {
    this.mode = mode;
    this.scaleChord = scaleChord;
    this.fundamental = fundamental;
    this.size = size;
    this.sequence = sequence;

    this.computeCache();
  }

  setMode(mode: Scales) {
    this.mode = mode;
  }

  setScaleChord(scaleChord: number) {
    this.scaleChord = scaleChord;
  }

  setFundamental(fundamental: Keys) {
    this.fundamental = fundamental;
  }

  changeOrder(index: number, order: number) {
    this.sequence[index] = order;
  }

  getArpeggio() {
    const cacheKey = `${this.mode}_${this.scaleChord}_${this.fundamental}_${this.size}`;
    return this.cache[cacheKey];
  }

  getSize() {
    return this.size;
  }

  getSequence() {
    return this.sequence;
  }

  private computeCache(baseOctave = 4) {
    SCALES.forEach(mode => {
      SCALES_DATA[mode].triads.forEach((_, scaleChordIdx) => {
        KEYS.forEach(fundamental => {
          for (let i = 3; i <= 6; i += 1) {
            const cacheKey = `${mode}_${scaleChordIdx}_${fundamental}_${i}`;
            const { notes, octaveUp } = this.computeTriad(mode, scaleChordIdx, fundamental);
            const arpeggio = this.expandChordToArpeggio(notes, i, octaveUp + baseOctave);
            this.cache[cacheKey] = arpeggio;
          }
        });
      });
    });
  }

  private expandChordToArpeggio(chordNotes: Keys[], size = 6, baseOctave = 4) {
    const arpeggio: Note[] = [];
    let previousNoteIdx = -1;
    let octave = baseOctave;
    for (let i = 0; i < size; i += 1) {
      const note = chordNotes[i % chordNotes.length];
      if (KEYS.indexOf(note) < previousNoteIdx) {
        octave += 1;
      }

      arpeggio.push(`${note}${octave}`);
      previousNoteIdx = KEYS.indexOf(note);
    }
    return arpeggio;
  }

  private computeTriad(mode: Scales, scaleChordIdx: number, fundamental: Keys) {
    const offset = KEYS.indexOf(fundamental);
    const step = SCALES_DATA[mode].steps[scaleChordIdx];
    const chordType = SCALES_DATA[mode].triads[scaleChordIdx];
    const baseNoteIdx = (offset + step) % KEYS.length;

    let octaveUp = 0;
    if (offset + step > KEYS.length) {
      octaveUp = 1;
    }

    const intervals = CHORD_INTERVALS[chordType];
    const notes = intervals.map(interval => {
      const noteIdx = (baseNoteIdx + interval) % KEYS.length;
      return KEYS[noteIdx];
    });
    return { notes, octaveUp };
  }
}
