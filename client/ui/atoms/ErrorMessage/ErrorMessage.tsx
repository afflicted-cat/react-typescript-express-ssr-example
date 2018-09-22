import * as React from 'react';
import * as classNames from 'classnames';

import * as styles from './ErrorMessage.scss';

interface Props {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: Props) {
  return <div className={classNames(styles.errorMessage, className)}>{message}</div>;
}
