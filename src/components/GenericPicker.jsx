import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { observer } from 'mobx-react';

import styles from './GenericPicker.css';

@observer
class GenericPicker extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    containerStyle: PropTypes.string,
    pickerStyle: PropTypes.string,
    label: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: null,
    pickerStyle: null,
    label: null,
  };

  renderOptions = (options) => {
    const classes = { root: styles.radioButton };
    return options.map(option => (
      <FormControlLabel
        value={option}
        key={option}
        control={<Radio classes={classes} />}
        label={option}
      />
    ));
  }

  render() {
    const { data, onChange, currentValue, containerStyle, pickerStyle, label } = this.props;
    return (
      <FormControl className={[styles.container, containerStyle].join(' ')}>
        <FormLabel component="legend" className={styles.label}>{label}</FormLabel>
        <RadioGroup
          onChange={(_, value) => onChange(value)}
          value={currentValue}
          className={[styles.picker, pickerStyle].join(' ')}
        >
          {this.renderOptions(data)}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default GenericPicker;
