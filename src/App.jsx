import React, { PureComponent } from 'react';
import { StylesProvider } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { observer } from 'mobx-react';
import Arpeggiator, { SCALES, KEYS } from './components/Arpeggiator';
import PianoRoll from './components/PianoRoll';
import ScalePicker from './components/ScalePicker';
import GenericPicker from './components/GenericPicker';
import ArpeggiatorPlayer from './components/ArpeggiatorPlayer';
import PlayPauseButton from './components/PlayPauseButton';
import OrderPicker from './components/OrderPicker';
import ProgressionPicker from './components/ProgressionPicker';

import styles from './App.css';


class WavyBackground extends PureComponent {
  render() {
    return <div className={styles.wavyBackground} />;
  }
}

@observer
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.arpeggiator = new Arpeggiator();
    this.player = new ArpeggiatorPlayer(this.arpeggiator);
  }

  render() {
    const marks = [{
      value: 45,
      label: '45 bpm',
    }, {
      value: 150,
      label: '150 bpm',
    }];
    return (
      <StylesProvider injectFirst>
        <WavyBackground />
        <div className={styles.container}>
          <div className={styles.content}>
            <PianoRoll lighted={this.player.activeNotes} />
            <ScalePicker arpeggiator={this.arpeggiator} />
            <div className={styles.controlPanel}>
              <GenericPicker
                data={Object.keys(SCALES)}
                currentValue={this.arpeggiator.mode}
                label="Mode"
                onChange={s => this.arpeggiator.setMode(s)}
                pickerStyle={styles.modePicker}
              />
              <GenericPicker
                data={KEYS}
                currentValue={this.arpeggiator.fundamental}
                onChange={s => this.arpeggiator.setFundamental(s)}
                label="Fundamental"
                pickerStyle={styles.rootPicker}
              />
              <div className={styles.controls}>
                <PlayPauseButton source={this.player} />
                <div className={styles.bpmLoopControls}>
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
                    classes={{ markLabel: styles.bpmLabel, root: styles.bpmPicker }}
                  />
                  <GenericPicker
                    data={['no loop', 'loop']}
                    currentValue={this.arpeggiator.loop ? 'loop' : 'no loop'}
                    onChange={s => this.arpeggiator.setLoop(s === 'loop')}
                    containerStyle={styles.loopPicker}
                  />
                </div>
                <OrderPicker arpeggiator={this.arpeggiator} containerStyle={styles.orderPicker} />
                <div className={styles.progressionControls}>
                  <ProgressionPicker
                    player={this.player}
                    containerStyle={styles.progressionPicker}
                  />
                  <FormGroup row>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={this.player.progressionEnabled}
                          onChange={(_, checked) => this.player.setProgressionEnabled(checked)}
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      )}
                      label="Enabled"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StylesProvider>
    );
  }
}

export default App;
