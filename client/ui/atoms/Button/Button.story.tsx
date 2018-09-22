import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from './Button';

storiesOf('ui/atoms/Button', module)
  .add('default', () => <Button text={text('text', 'some text')} onClick={action('onCLick')} />)
  .add('with children', () => (
    <Button onClick={action('onCLick')}>
      <span>{text('children', 'span as children')}</span>
    </Button>
  ));
