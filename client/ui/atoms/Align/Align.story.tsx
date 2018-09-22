import * as React from 'react';
import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Align } from './Align';

storiesOf('ui/atoms/Align', module).add('default', () => (
  <Align
    vertical={select('vertical', ['top', 'center', 'bottom', 'stretch'], 'center')}
    horizontal={select('horizontal', ['start', 'center', 'end', 'between', 'around', 'evenly'], 'center')}>
    <h1>{text('children', 'one children')}</h1>
    <h1>{text('children', 'two children')}</h1>
  </Align>
));
