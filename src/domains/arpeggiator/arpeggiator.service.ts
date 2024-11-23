import { getDefaultStore } from 'jotai';
import * as Tone from 'tone';

import { SCALES_DATA } from './arpeggiator.constant';
import * as state from './arpeggiator.state';
import { Keys, Scales } from './arpeggiator.type';
import { ArpeggioBuilder } from './helpers/arpeggioBuilder';
import { getLabelForScaleChord } from './helpers/getLabelForScaleChord';

class ArpeggiatorService {
  private readonly store: ReturnType<typeof getDefaultStore>;
  private readonly synth: Tone.PolySynth;
  private readonly transport: ReturnType<typeof Tone.getTransport>;
  private readonly arpeggiator: ArpeggioBuilder;

  private step = 0;
  private loopSign = 1;
  private currentProgression = 0;

  constructor() {
    this.store = getDefaultStore();

    this.transport = Tone.getTransport();
    this.transport.bpm.value = this.store.get(state.bpm);

    this.arpeggiator = new ArpeggioBuilder(
      this.store.get(state.mode),
      this.store.get(state.scaleChord),
      this.store.get(state.fundamental),
      6,
      this.store.get(state.sequence),
    );

    // polyphonic synth
    this.synth = new Tone.PolySynth({
      maxPolyphony: 16,
      voice: Tone.Synth,
      options: {
        oscillator: {
          type: 'triangle',
        },
      },
    });

    // output of the player
    const masterChannel = new Tone.Gain(0.7);
    masterChannel.toDestination();

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
    this.synth.chain(fx.delay, fx.reverb, masterChannel);

    this.transport.scheduleRepeat(time => this.onNextTick(time), '16n');
  }

  play() {
    this.transport.start();
  }

  pause() {
    this.transport.stop();
  }

  setMode(mode: Scales) {
    this.store.set(state.mode, mode);
    this.arpeggiator.setMode(mode);
  }

  setFundamental(fundamental: Keys) {
    this.store.set(state.fundamental, fundamental);
    this.arpeggiator.setFundamental(fundamental);
  }

  setLoop(loop: boolean) {
    this.store.set(state.loop, loop);
  }

  setBpm(bpm: number) {
    this.store.set(state.bpm, bpm);
    this.transport.bpm.value = bpm;
  }

  setScaleChord(scaleChord: number) {
    this.store.set(state.scaleChord, scaleChord);
    this.arpeggiator.setScaleChord(scaleChord);
  }

  updateNoteOrder(index: number, value: number) {
    const sequence = [...this.arpeggiator.getSequence()];
    sequence[index] = value;
    this.store.set(state.sequence, sequence);
    this.arpeggiator.changeOrder(index, value);
  }

  getArpeggio() {
    return this.arpeggiator.getArpeggio();
  }

  getCurrentScale() {
    const { triads } = SCALES_DATA[this.store.get(state.mode)];
    return triads.map((chordType, index) => getLabelForScaleChord(index, chordType));
  }

  updateProgression(index: number, value: number) {
    const progressionEnabled = this.store.get(state.progressionEnabled);
    const currentProgression = this.store.get(state.currentProgression);

    const sequence = [...this.store.get(state.progressionSequence)];
    sequence[index] = value;
    this.store.set(state.progressionSequence, sequence);

    if (progressionEnabled && index === currentProgression) {
      this.arpeggiator.setScaleChord(sequence[currentProgression]);
    }
  }

  setProgressionEnabled(progressionEnabled: boolean) {
    this.store.set(state.progressionEnabled, progressionEnabled);
  }

  private onNextTick(time: number) {
    const arpeggio = this.arpeggiator.getArpeggio();
    const sequence = this.arpeggiator.getSequence();
    const size = this.arpeggiator.getSize();
    const loop = this.store.get(state.loop);

    const note = sequence != null ? arpeggio[sequence[this.step]] : arpeggio[this.step];

    this.synth.triggerAttackRelease(note, '16n', time);
    this.store.set(state.activeNotes, [note]);

    if (loop) {
      this.step += this.loopSign;
      if (this.step >= size) {
        this.step = size - 2;
        this.loopSign = -1;
      } else if (this.step < 0) {
        this.step = 1;
        this.loopSign = 1;
        this.incrementProgression();
      }
    } else {
      this.step = (this.step + 1) % size;
      if (this.step === 0) {
        this.incrementProgression();
      }
    }
  }

  private incrementProgression() {
    const progressionEnabled = this.store.get(state.progressionEnabled);
    if (progressionEnabled) {
      const progressionSequence = this.store.get(state.progressionSequence);
      this.currentProgression = (this.currentProgression + 1) % progressionSequence.length;

      const scaleChord = progressionSequence[this.currentProgression];
      this.arpeggiator.setScaleChord(scaleChord);

      this.store.set(state.scaleChord, scaleChord);
      this.store.set(state.currentProgression, this.currentProgression);
    }
  }
}

export const arpeggiatorService = new ArpeggiatorService();
