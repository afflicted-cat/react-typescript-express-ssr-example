import { withBackgrounds } from '@storybook/addon-backgrounds';
import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';

import { reactDecorator } from './reactDecorator';

addDecorator(
  withBackgrounds([
    { name: 'Gray', value: '#252525', default: true },
    { name: 'Base', value: '#ffffff' },
    { name: 'Black', value: '#000' }
  ])
);

addDecorator(withKnobs);

addDecorator(reactDecorator);

setOptions({ name: 'Storybook' });

configure(() => {
  const req = require.context('../client', true, /\.story\.tsx?$/);
  req.keys().forEach(req);
}, module);
