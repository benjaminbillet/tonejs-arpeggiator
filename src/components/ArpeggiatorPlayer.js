import { observable, action } from 'mobx';
import Tone from 'tone';

export default class ArpeggiatorPlayer {
  @observable
  bpm = 105;

  @observable
  activeNotes = [];

  @observable
  progressionEnabled = true;

  @observable
  progressionSequence = [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0];

  @observable
  currentProgression = 0;

  constructor(arpeggiator, bpm = 105) {
    this.arpeggiator = arpeggiator;
    this.bpm = bpm;
    this.step = 0;

    // output of the player
    this.masterChannel = new Tone.Gain(0.7);
    this.masterChannel.toMaster();

    // polyphonic AM synth
    this.synth = new Tone.PolySynth(1, Tone.SimpleAM);

    // fx for the synthesizer
    this.fx = {
      distortion: new Tone.Distortion(0.8),
      reverb: new Tone.Freeverb(0.1, 3000),
      delay: new Tone.PingPongDelay('16n', 0.1),
    };
    this.fx.distortion.wet.value = 0.2;
    this.fx.reverb.wet.value = 0.2;
    this.fx.delay.wet.value = 0.3;

    // chaining the synth -> effects -> output channel
    this.synth.chain(this.fx.delay, this.fx.reverb, this.masterChannel);


    this.transport = Tone.Transport;
    this.transport.bpm.value = this.bpm;

    let loopSign = 1;
    this.currentProgression = 0;
    this.transport.scheduleRepeat((time) => {
      const { arpeggio, loop, sequence, size } = this.arpeggiator;

      let note = null;
      if (sequence != null) {
        note = arpeggio[sequence[this.step]];
      } else {
        note = arpeggio[this.step];
      }

      this.synth.triggerAttackRelease(note, '16n', time);
      this.activeNotes = [note];

      if (loop) {
        this.step += loopSign;
        if (this.step >= size) {
          this.step = size - 2;
          loopSign = -1;
        } else if (this.step < 0) {
          this.step = 1;
          loopSign = 1;
          this.incrementProgression();
        }
      } else {
        this.step = (this.step + 1) % size;
        if (this.step === 0) {
          this.incrementProgression();
        }
      }
    }, '16n');
  }

  start() {
    this.transport.start();
  }

  stop() {
    this.transport.stop();
  }

  @action
  setBpm(bpm) {
    this.bpm = bpm;
    this.transport.bpm.value = this.bpm;
  }

  @action
  changeProgression(index, value) {
    this.progressionSequence[index] = value;
    if (this.progressionEnabled && index === this.currentProgression) {
      this.arpeggiator.setScaleChord(this.progressionSequence[this.currentProgression]);
    }
  }

  @action
  setProgressionEnabled(progressionEnabled) {
    this.progressionEnabled = progressionEnabled;
  }

  incrementProgression() {
    if (this.progressionEnabled) {
      this.currentProgression = (this.currentProgression + 1) % this.progressionSequence.length;
      this.arpeggiator.setScaleChord(this.progressionSequence[this.currentProgression]);
    }
  }
}
