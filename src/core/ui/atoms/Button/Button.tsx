import * as React from 'react';
import classNames from 'classnames';

import styles from './Button.scss';

interface Props {
  text?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export function Button({ onClick, text, children, className }: Props) {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {text || children}
    </button>
  );
}
