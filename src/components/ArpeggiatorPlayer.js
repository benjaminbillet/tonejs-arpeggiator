import { observable, action } from 'mobx';
import Tone from 'tone';

export default class ArpeggiatorPlayer {
  @observable
  bpm = 45;

  @observable
  activeNotes = [];

  constructor(arpeggiator, bpm = 45) {
    this.arpeggiator = arpeggiator;
    this.bpm = bpm;
    this.step = 0;
    // this.activeNotes = [this.arpeggiator.arpeggio[this.step]];

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

    this.transport.scheduleRepeat((time) => {
      const note = this.arpeggiator.arpeggio[this.step];
      this.synth.triggerAttackRelease(note, '16n', time);
      this.activeNotes = [note];
      this.step = (this.step + 1) % this.arpeggiator.size;
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
}
