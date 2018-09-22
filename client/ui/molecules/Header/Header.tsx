import * as React from 'react';
import * as classNames from 'classnames';

import { Logo } from 'ui';

import * as style from './Header.scss';

interface Props {
  title: string;
  className?: string;
}

export function Header({ title, className }: Props) {
  return (
    <header className={classNames(style.header, className)}>
      <Logo />
      <h1 className={style.title}>{title}</h1>
    </header>
  );
}
