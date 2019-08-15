import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import styles from './PlayPauseButton.css';


export default class PlayPauseButton extends PureComponent {
  static propTypes = {
    source: PropTypes.shape({
      start: PropTypes.func,
      stop: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { playing: false };
  }

  onClick = () => {
    const { playing } = this.state;
    const { source } = this.props;
    if (playing) {
      source.stop();
    } else {
      source.start();
    }
    this.setState({ playing: !playing });
  }

  render() {
    let text = 'Play';
    let className = styles.playPauseButtonPlaying;
    const { playing } = this.state;
    if (playing) {
      text = 'Pause';
      className = styles.playPauseButtonPaused;
    }
    return (
      <Button
        variant="contained"
        onClick={this.onClick}
        className={styles.playPauseButton}
        classes={{ contained: className }}
      >
        {text}
      </Button>
    );
  }
}
