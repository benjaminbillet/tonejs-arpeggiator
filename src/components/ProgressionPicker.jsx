import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';

import ArpeggiatorPlayer from './ArpeggiatorPlayer';
import styles from './ProgressionPicker.css';

@observer
class ProgressionPicker extends Component {
  static propTypes = {
    player: PropTypes.instanceOf(ArpeggiatorPlayer).isRequired,
    containerStyle: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: null,
  };

  onSlide = (index, e, value) => {
    const { player } = this.props;
    player.changeProgression(index, value);
  }

  renderSliders() {
    const { player } = this.props;
    const { arpeggiator, progressionSequence, currentProgression } = player;
    return progressionSequence.map((chordType, index) => {
      let selected = null;
      if (currentProgression === index) {
        selected = styles.activeSlider;
      }
      return (
        <Slider
          classes={{ vertical: styles.slider, root: selected }}
          key={index}
          orientation="vertical"
          min={0}
          max={6}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={x => arpeggiator.currentScale[x]}
          value={chordType}
          onChange={(event, value) => this.onSlide(index, event, value)}
        />
      );
    });
  }

  render() {
    const { containerStyle, player } = this.props;
    const { arpeggiator } = player;
    const marks = arpeggiator.currentScale.map((label, value) => ({ label, value }));
    const classes = {
      thumb: styles.hiddenThumb,
      markLabelActive: styles.markLabelActive,
      markLabel: styles.markLabel,
      vertical: styles.slider,
    };
    return (
      <div className={[styles.container, containerStyle].join(' ')}>
        <Typography gutterBottom className={styles.label}>Progression</Typography>
        {this.renderSliders()}
        <Slider
          classes={classes}
          disabled
          orientation="vertical"
          min={0}
          max={6}
          marks={marks}
          defaultValue={0}
        />
      </div>
    );
  }
}

export default ProgressionPicker;
