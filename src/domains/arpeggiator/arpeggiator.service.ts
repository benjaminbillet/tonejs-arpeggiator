import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import { SCALE_CHORDS, SCALES_DATA } from './arpeggiator.constant';
import * as state from './arpeggiator.state';
import { ChordIntervals, Keys, Scales } from './arpeggiator.type';
import { ArpeggioBuilder } from './ArpeggioBuilder';

const store = getDefaultStore();

const createTransport = () => {
  // output of the player
  const masterChannel = new Tone.Gain(0.7);
  masterChannel.toDestination();

  // polyphonic AM synth
  const synth = new Tone.PolySynth({
    maxPolyphony: 16,
    voice: Tone.Synth,
    options: {
      oscillator: {
        type: 'triangle',
      },
    },
  });

  // fx for the synthesizer
  const fx = {
    distortion: new Tone.Distortion(0.8),
    reverb: new Tone.Freeverb(0.1, 3000),
    delay: new Tone.PingPongDelay('16n', 0.1),
  };
  fx.distortion.wet.value = 0.2;
  fx.reverb.wet.value = 0.2;
  fx.delay.wet.value = 0.3;

  // chaining the synth -> effects -> output channel
  synth.chain(fx.delay, fx.reverb, masterChannel);

  const transport = Tone.getTransport();
  transport.bpm.value = store.get(state.bpm);

  let step = 0;
  let loopSign = 1;
  let currentProgression = 0;

  const incrementProgression = () => {
    const progressionEnabled = store.get(state.progressionEnabled);
    if (progressionEnabled) {
      const progressionSequence = store.get(state.progressionSequence);
      currentProgression = (currentProgression + 1) % progressionSequence.length;
      arpeggiator.setScaleChord(progressionSequence[currentProgression]);
      store.set(state.currentProgression, currentProgression);
    }
  };

  const arpeggiator = new ArpeggioBuilder(
    store.get(state.mode),
    store.get(state.scaleChord),
    store.get(state.fundamental),
    6,
    store.get(state.sequence),
  );

  transport.scheduleRepeat(time => {
    const arpeggio = arpeggiator.getArpeggio();
    const sequence = arpeggiator.getSequence();
    const size = arpeggiator.getSize();
    const loop = store.get(state.loop);

    let note = null;
    if (sequence != null) {
      note = arpeggio[sequence[step]];
    } else {
      note = arpeggio[step];
    }

    synth.triggerAttackRelease(note, '16n', time);
    store.set(state.activeNotes, [note]);

    if (loop) {
      step += loopSign;
      if (step >= size) {
        step = size - 2;
        loopSign = -1;
      } else if (step < 0) {
        step = 1;
        loopSign = 1;
        incrementProgression();
      }
    } else {
      step = (step + 1) % size;
      if (step === 0) {
        incrementProgression();
      }
    }
  }, '16n');

  return { transport, arpeggiator };
};

const { transport, arpeggiator } = createTransport();

export const play = () => {
  transport.start();
};

export const pause = () => {
  transport.stop();
};

export const setMode = (mode: Scales) => {
  store.set(state.mode, mode);
  arpeggiator.setMode(mode);
};

export const setFundamental = (fundamental: Keys) => {
  store.set(state.fundamental, fundamental);
  arpeggiator.setFundamental(fundamental);
};

export const setLoop = (loop: boolean) => {
  store.set(state.loop, loop);
};

export const setBpm = (bpm: number) => {
  store.set(state.bpm, bpm);
  transport.bpm.value = bpm;
};

export const setScaleChord = (scaleChord: number) => {
  store.set(state.scaleChord, scaleChord);
  arpeggiator.setScaleChord(scaleChord);
};

export const updateNoteOrder = (index: number, value: number) => {
  const sequence = [...arpeggiator.getSequence()];
  sequence[index] = value;
  store.set(state.sequence, sequence);
  arpeggiator.changeOrder(index, value);
};

export const scaleChordToLabel = (scaleChordIdx: number, triadType: ChordIntervals) => {
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

export const getArpeggio = () => {
  return arpeggiator.getArpeggio();
};

export const getCurrentScale = () => {
  const { triads } = SCALES_DATA[store.get(state.mode)];
  return triads.map((chordType, index) => scaleChordToLabel(index, chordType));
};

export const updateProgression = (index: number, value: number) => {
  const progressionEnabled = store.get(state.progressionEnabled);
  const currentProgression = store.get(state.currentProgression);

  const sequence = [...store.get(state.progressionSequence)];
  sequence[index] = value;
  store.set(state.progressionSequence, sequence);

  if (progressionEnabled && index === currentProgression) {
    arpeggiator.setScaleChord(sequence[currentProgression]);
  }
};

export const setProgressionEnabled = (progressionEnabled: boolean) => {
  store.set(state.progressionEnabled, progressionEnabled);
};
