import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';

import Arpeggiator from './Arpeggiator';
import styles from './OrderPicker.css';

@observer
class OrderPicker extends Component {
  static propTypes = {
    arpeggiator: PropTypes.instanceOf(Arpeggiator).isRequired,
    containerStyle: PropTypes.string,
  };

  static defaultProps = {
    containerStyle: null,
  };

  onSlide = (index, e, value) => {
    const { arpeggiator } = this.props;
    arpeggiator.changeOrder(index, value - 1);
  }

  renderSliders() {
    const { arpeggiator } = this.props;
    const { sequence } = arpeggiator;
    return sequence.map((seqValue, index) => (
      <Slider
        classes={{ vertical: styles.slider }}
        key={index}
        orientation="vertical"
        min={1}
        max={arpeggiator.size}
        step={1}
        valueLabelDisplay="auto"
        value={seqValue + 1}
        onChange={(event, value) => this.onSlide(index, event, value)}
      />
    ));
  }

  render() {
    const { arpeggiator, containerStyle } = this.props;
    const marks = [
      { value: 1, label: '1' },
      { value: arpeggiator.size, label: `${arpeggiator.size}` },
    ];
    const classes = {
      thumb: styles.hiddenThumb,
      markLabelActive: styles.markLabelActive,
      markLabel: styles.markLabel,
      vertical: styles.slider,
    };
    return (
      <div className={[styles.container, containerStyle].join(' ')}>
        <Typography gutterBottom className={styles.label}>Note order</Typography>
        {this.renderSliders()}
        <Slider
          classes={classes}
          disabled
          orientation="vertical"
          min={1}
          max={arpeggiator.size}
          marks={marks}
          defaultValue={0}
        />
      </div>
    );
  }
}

export default OrderPicker;
