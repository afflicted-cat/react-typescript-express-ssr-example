import * as React from 'react';
import * as classNames from 'classnames';

import * as styles from './Align.scss';

interface Props {
  children: React.ReactNode;
  className?: 'string';
  vertical?: 'top' | 'center' | 'bottom' | 'stretch';
  horizontal?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export function Align({ vertical = 'center', horizontal = 'center', className, children }: Props) {
  return (
    <div className={classNames(styles.align, styles[`v-${vertical}`], styles[`h-${horizontal}`], className)}>
      {children}
    </div>
  );
}
