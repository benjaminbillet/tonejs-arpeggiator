import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { observer } from 'mobx-react';

import styles from './GenericPicker.css';

@observer
class GenericPicker extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  renderOptions = (options) => {
    return options.map(option => (
      <FormControlLabel
        value={option}
        key={option}
        control={<Radio classes={{ root: styles.radioButton }} />}
        label={option}
      />
    ));
  }

  render() {
    const { data, onChange, currentValue } = this.props;
    return (
      <FormControl>
        <RadioGroup
          onChange={(_, value) => onChange(value)}
          value={currentValue}
          className={styles.oscillatorPicker}
        >
          {this.renderOptions(data)}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default GenericPicker;
