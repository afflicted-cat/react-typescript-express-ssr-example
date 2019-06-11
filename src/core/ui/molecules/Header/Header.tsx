import * as React from 'react';
import classNames from 'classnames';

import { Logo } from '@core/ui/atoms';

import styles from './Header.scss';

interface Props {
  title: string;
  className?: string;
}

export function Header({ title, className }: Props) {
  return (
    <header className={classNames(styles.header, className)}>
      <Logo />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
