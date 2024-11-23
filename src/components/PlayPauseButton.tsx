import React from 'react';
import clsx from 'clsx';

import { arpeggiatorService } from '../domains/arpeggiator/arpeggiator.service';
import { Button } from '../ds/Button';
import styles from './PlayPauseButton.module.css';

export function PlayPauseButton() {
  const [playing, setPlaying] = React.useState(false);

  const onClick = React.useCallback(() => {
    if (playing) {
      arpeggiatorService.pause();
    } else {
      arpeggiatorService.play();
    }
    setPlaying(!playing);
  }, [playing]);

  let text = 'Play';
  let stateClassName = styles.playPauseButtonPlaying;
  if (playing) {
    text = 'Pause';
    stateClassName = styles.playPauseButtonPaused;
  }

  return (
    <Button className={clsx(styles.playPauseButton, stateClassName)} onClick={onClick}>
      {text}
    </Button>
  );
}
