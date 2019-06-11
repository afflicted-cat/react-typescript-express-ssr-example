import * as React from 'react';

import { Header } from '@core/ui/molecules';

import styles from './PageTemplate.scss';

interface Props {
  title: string;
  children: React.ReactNode;
}

export function PageTemplate({ title, children }: Props) {
  return (
    <div className={styles.pageTemplate}>
      <Header title={title} />
      {children}
    </div>
  );
}
