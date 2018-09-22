import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { Header } from './Header';

storiesOf('ui/molecules/Header', module).add('default', () => <Header title={text('title', 'some title')} />);
