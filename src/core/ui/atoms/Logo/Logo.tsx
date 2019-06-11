import * as React from 'react';

import image from '@core/assets/images/logo.svg';

import styles from './Logo.scss';

export function Logo() {
  return <img src={image} className={styles.logo} alt="logo" />;
}
