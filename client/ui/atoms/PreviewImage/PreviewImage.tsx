import * as React from 'react';
import * as classNames from 'classnames';

import * as styles from './PreviewImage.scss';

interface Props {
  src: string;
  className?: string;
}

export function PreviewImage({ src, className }: Props) {
  return <img src={src} className={classNames(styles.previewImage, className)} />;
}
