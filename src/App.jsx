import React, { PureComponent } from 'react';
import { StylesProvider } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import { observer } from 'mobx-react';
import Arpeggiator, { SCALES, KEYS } from './components/Arpeggiator';
import PianoRoll from './components/PianoRoll';
import ScalePicker from './components/ScalePicker';
import GenericPicker from './components/GenericPicker';
import ArpeggiatorPlayer from './components/ArpeggiatorPlayer';
import PlayPauseButton from './components/PlayPauseButton';

import styles from './App.css';


class WavyBackground extends PureComponent {
  render() {
    return <div className={styles.wavyBackground} />;
  }
}

//


@observer
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.arpeggiator = new Arpeggiator();
    this.player = new ArpeggiatorPlayer(this.arpeggiator, 150);
  }

  render() {
    const marks = [
      {
        value: 45,
        label: '45 bpm',
      },
      {
        value: 150,
        label: '150 bpm',
      },
    ];
    return (
      <StylesProvider injectFirst>
        <WavyBackground />
        <div className={styles.container}>
          <div className={styles.content}>
            <PianoRoll lighted={this.player.activeNotes} />
            <ScalePicker arpeggiator={this.arpeggiator} />
            <GenericPicker data={KEYS} currentValue={this.arpeggiator.fundamental} onChange={s => this.arpeggiator.setFundamental(s)} />
            <GenericPicker data={Object.keys(SCALES)} currentValue={this.arpeggiator.mode} onChange={s => this.arpeggiator.setMode(s)} />
            <PlayPauseButton source={this.player} />
            <Slider
              className={styles.slider}
              orientation="horizontal"
              min={45}
              max={150}
              step={5}
              marks={marks}
              valueLabelDisplay="auto"
              value={this.player.bpm}
              onChange={(_, value) => this.player.setBpm(value)}
            />
          </div>
        </div>
      </StylesProvider>
    );
  }
}

export default App;
