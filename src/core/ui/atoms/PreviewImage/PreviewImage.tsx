import * as React from 'react';
import classNames from 'classnames';

import styles from './PreviewImage.scss';

interface Props {
  src: string;
  className?: string;
}

export function PreviewImage({ src, className }: Props) {
  return <img src={src} className={classNames(styles.previewImage, className)} />;
}
