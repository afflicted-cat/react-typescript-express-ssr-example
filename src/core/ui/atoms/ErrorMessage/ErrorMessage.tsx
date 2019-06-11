import * as React from 'react';
import classNames from 'classnames';

import styles from './ErrorMessage.scss';

interface Props {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: Props) {
  return <div className={classNames(styles.errorMessage, className)}>{message}</div>;
}
