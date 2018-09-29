import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { Html } from './template';

interface Props {
  content: string;
  styles?: string[];
  scripts?: string[];
  initialValues?: string;
}

export const renderHtml = (props: Props) => {
  const html = <Html {...props} />;
  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};
