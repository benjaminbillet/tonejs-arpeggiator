import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { KEYS } from './Arpeggiator';
import styles from './PianoRoll.css';

class PianoRoll extends Component {
  static propTypes = {
    octaves: PropTypes.arrayOf(PropTypes.number),
    lighted: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    octaves: [2, 3, 4, 5, 6, 7],
    lighted: [],
  };

  isLighted = (octave, note) => {
    const { lighted } = this.props;
    for (let i = 0; i < lighted.length; i++) {
      if (`${note}${octave}` === lighted[i]) {
        if (lighted[i].startsWith(note)) {
          return true;
        }
      }
    }
    return false;
  }

  renderOctave = (octave) => {
    return KEYS.map((key) => {
      let className = styles.key;
      if (key.endsWith('#')) {
        className = styles.sharpKey;
      }

      if (this.isLighted(octave, key)) {
        className = [className, styles.selectedKey].join(' ');
      }

      return <div className={className} key={`${key}${octave}`} />;
    });
  }

  renderKeys = () => {
    const { octaves } = this.props;
    return octaves.flatMap(this.renderOctave);
  }

  render() {
    return (
      <div className={styles.pianoroll}>
        {this.renderKeys()}
      </div>
    );
  }
}

export default PianoRoll;
