import './theme.css';

import React from 'react';
import { useAtom } from 'jotai';

import styles from './App.module.css';
import { CurrentNote } from './components/CurrentNote';
import OrderPicker from './components/OrderPicker';
import { PianoRoll } from './components/PianoRoll';
import { PlayPauseButton } from './components/PlayPauseButton';
import ProgressionPicker from './components/ProgressionPicker';
import {
  KEYS,
  SCALE_CHORDS,
  SCALES,
  SCALES_DATA,
} from './domains/arpeggiator/arpeggiator.constant';
import * as arpeggiatorActions from './domains/arpeggiator/arpeggiator.service';
import { scaleChordToLabel } from './domains/arpeggiator/arpeggiator.service';
import * as arpeggiatorState from './domains/arpeggiator/arpeggiator.state';
import { Keys, Scales } from './domains/arpeggiator/arpeggiator.type';
import { FlexCell } from './ds/FlexCell';
import { HorizontalSlider } from './ds/HorizontalSlider';
import { Legend } from './ds/Legend';
import { RadioPicker } from './ds/RadioPicker';

const WavyBackground = () => {
  return <div className={styles.wavyBackground} />;
};

const scalesOptions = Object.entries(SCALES_DATA).map(([key, scale]) => ({
  label: scale.label,
  value: key,
}));
const keysOptions = KEYS.map(key => ({ label: key, value: key }));
const loopOptions = [
  { label: 'no loop', value: 'no-loop' },
  { label: 'loop', value: 'loop' },
];

export const App = () => {
  const [mode] = useAtom(arpeggiatorState.mode);
  const [fundamental] = useAtom(arpeggiatorState.fundamental);
  const [loop] = useAtom(arpeggiatorState.loop);
  const [bpm] = useAtom(arpeggiatorState.bpm);
  const [scaleChord] = useAtom(arpeggiatorState.scaleChord);

  const scaleOptions = SCALES_DATA[mode].triads.map((key, index) => ({
    label: scaleChordToLabel(index, key),
    value: `${index}`,
  }));

  return (
    <>
      <WavyBackground />
      <div className={styles.container}>
        <div className={styles.content}>
          <FlexCell orientation="horizontal" stretch>
            <PianoRoll />
            <CurrentNote />
          </FlexCell>
          <FlexCell orientation="horizontal" stretch>
            <FlexCell orientation="horizontal" className={styles.sidePanel}>
              <RadioPicker
                legend={<Legend>Mode</Legend>}
                orientation="vertical"
                options={scalesOptions}
                value={mode}
                onChange={m => arpeggiatorActions.setMode(m as Scales)}
                name="mode"
              />
              <RadioPicker
                legend={<Legend>Fundamental</Legend>}
                orientation="vertical"
                options={keysOptions}
                value={fundamental}
                onChange={f => arpeggiatorActions.setFundamental(f as Keys)}
                name="fundamental"
              />
            </FlexCell>
            <FlexCell orientation="vertical" stretch>
              <PlayPauseButton />
              <FlexCell orientation="horizontal" className={styles.bpmLine}>
                <FlexCell orientation="vertical" className={styles.bpm}>
                  <HorizontalSlider
                    min={45}
                    max={145}
                    step={5}
                    value={bpm}
                    onChange={value => arpeggiatorActions.setBpm(value)}
                  />
                  <div className={styles.bpmLegend}>
                    <div className={styles.bpmLeftMark}>45 bpm</div>
                    <div className={styles.bpmRightMark}>145 bpm</div>
                  </div>
                </FlexCell>
                <RadioPicker
                  options={loopOptions}
                  value={loop ? 'loop' : 'no-loop'}
                  onChange={s => arpeggiatorActions.setLoop(s === 'loop')}
                  name="loop"
                />
              </FlexCell>
              <RadioPicker
                legend={<Legend>Scale</Legend>}
                orientation="horizontal"
                options={scaleOptions}
                value={`${scaleChord}`}
                onChange={s => arpeggiatorActions.setScaleChord(parseInt(s))}
                name="scale"
              />
              <OrderPicker />
              <ProgressionPicker />
            </FlexCell>
          </FlexCell>
        </div>
      </div>
    </>
  );
};
