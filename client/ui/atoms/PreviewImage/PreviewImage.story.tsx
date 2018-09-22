import * as React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PreviewImage } from './PreviewImage';

storiesOf('PreviewImage', module).add('default', () => (
  <PreviewImage src={text('src', 'https://avatars1.githubusercontent.com/u/19638267')} />
));
