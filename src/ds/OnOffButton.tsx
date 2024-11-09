import React from 'react';
import { Switch } from 'antd';

import styles from './OnOffButton.module.css';

export interface OnOffButtonProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function OnOffButton({ value, onChange }: OnOffButtonProps) {
  return (
    <Switch
      checkedChildren="ON"
      unCheckedChildren="OFF"
      className={styles.button}
      checked={value}
      onChange={onChange}
    />
  );
}
