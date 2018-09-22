import * as React from 'react';

import * as image from 'assets/images/logo.svg';

import * as styles from './Logo.scss';

export function Logo() {
  return <img src={image} className={styles.logo} alt="logo" />;
}
