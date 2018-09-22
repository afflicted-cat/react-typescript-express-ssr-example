import * as React from 'react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { PageTemplate } from './PageTemplate';

storiesOf('ui/templates/PageTemplate', module).add('default', () => (
  <PageTemplate title={text('title', 'some title')}>
    <h1>{text('children', 'h1 as children')}</h1>
  </PageTemplate>
));
