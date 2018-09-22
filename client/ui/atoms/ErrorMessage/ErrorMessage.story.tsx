import * as React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ErrorMessage } from './ErrorMessage';

storiesOf('ui/atoms/ErrorMessage', module).add('default', () => (
  <ErrorMessage message={text('message', 'some message')} />
));
