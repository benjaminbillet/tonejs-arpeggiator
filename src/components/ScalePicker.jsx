import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { observer } from 'mobx-react';

import styles from './ScalePicker.css';
import Arpeggiator from './Arpeggiator';

@observer
class ScalePicker extends PureComponent {
  static propTypes = {
    arpeggiator: PropTypes.instanceOf(Arpeggiator).isRequired,
  };

  handleChange = (event) => {
    const { arpeggiator } = this.props;
    arpeggiator.setScaleChord(parseInt(event.target.value, 10));
  }

  renderOptions = (arpeggiator) => {
    const { currentScale } = arpeggiator;
    return currentScale.map((chordType, index) => (
      <FormControlLabel
        value={`${index}`}
        key={chordType}
        control={<Radio classes={{ root: styles.radioButton }} />}
        label={chordType}
      />
    ));
  }

  render() {
    const { arpeggiator } = this.props;
    return (
      <FormControl className={styles.container}>
        <FormLabel component="legend" className={styles.label}>Scale</FormLabel>
        <RadioGroup
          onChange={this.handleChange}
          value={`${arpeggiator.scaleChord}`}
          className={styles.picker}
        >
          {this.renderOptions(arpeggiator)}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default ScalePicker;
