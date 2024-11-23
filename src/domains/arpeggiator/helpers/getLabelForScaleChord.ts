import { SCALE_CHORDS } from '../arpeggiator.constant';
import { ChordIntervals } from '../arpeggiator.type';

export const getLabelForScaleChord = (scaleChordIdx: number, triadType: ChordIntervals) => {
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
