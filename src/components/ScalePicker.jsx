import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { observer } from 'mobx-react';

import styles from './GenericPicker.css';
import Arpeggiator, { SCALES } from './Arpeggiator';

const scaleChordToLabel = (scaleChord, triadType) => {
  const s = scaleChord;
  switch (triadType) {
    case 'maj':
      return s.toUpperCase();
    case 'min':
      return s;
    case 'aug':
      return `${s.toUpperCase()}+`;
    case 'dim':
      return `${s}°`;
    default:
      throw new Error('unknow triadType');
  }
};

@observer
class ScalePicker extends PureComponent {
  static propTypes = {
    arpeggiator: PropTypes.instanceOf(Arpeggiator).isRequired,
  };

  handleChange = (event) => {
    const { arpeggiator } = this.props;
    arpeggiator.setScaleChord(event.target.value);
  }

  renderOptions = (arpeggiator) => {
    const scale = SCALES[arpeggiator.mode];
    return Object.keys(scale.triads).map((scaleChord) => {
      const chordType = scale.triads[scaleChord];
      return (
        <FormControlLabel
          value={scaleChord}
          key={scaleChord}
          control={<Radio classes={{ root: styles.radioButton }} />}
          label={scaleChordToLabel(scaleChord, chordType)}
        />
      );
    });
  }

  render() {
    const { arpeggiator } = this.props;
    return (
      <FormControl>
        <RadioGroup
          onChange={this.handleChange}
          value={arpeggiator.scaleChord}
          className={styles.oscillatorPicker}
        >
          {this.renderOptions(arpeggiator)}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default ScalePicker;
