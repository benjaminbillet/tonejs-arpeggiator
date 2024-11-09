import './theme.css';

import React from 'react';

import styles from './App.module.css';
import { BpmPicker } from './components/BpmPicker';
import { CurrentNote } from './components/CurrentNote';
import { FundamentalPicker } from './components/FundamentalPicker';
import { LoopToggle } from './components/LoopToggle';
import { ModePicker } from './components/ModePicker';
import { OrderPicker } from './components/OrderPicker';
import { PianoRoll } from './components/PianoRoll';
import { PlayPauseButton } from './components/PlayPauseButton';
import { ProgressionPicker } from './components/ProgressionPicker';
import { ScalePicker } from './components/ScalePicker';
import { FlexCell } from './ds/FlexCell';

const WavyBackground = () => {
  return <div className={styles.wavyBackground} />;
};

export const App = () => {
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
            <FlexCell orientation="horizontal" className={styles.leftPanel}>
              <ModePicker />
              <FundamentalPicker />
            </FlexCell>
            <FlexCell orientation="vertical" stretch className={styles.rightPanel}>
              <PlayPauseButton />
              <FlexCell orientation="horizontal" justifyContent="space-between" alignItems="center">
                <BpmPicker />
                <LoopToggle />
              </FlexCell>
              <ScalePicker />
              <OrderPicker />
              <ProgressionPicker />
            </FlexCell>
          </FlexCell>
        </div>
      </div>
    </>
  );
};
