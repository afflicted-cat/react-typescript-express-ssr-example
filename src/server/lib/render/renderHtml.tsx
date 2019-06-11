import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Helmet from 'react-helmet';

import { config } from '@core/common/config';

interface HtmlProps {
  content: string;
  styles?: string[];
  scripts?: string[];
  initialValues?: string;
}

export const renderHtml = ({ content, styles = [], scripts = [], initialValues = '' }: HtmlProps) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  const html = (
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=1450" />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styles.map(href => (
          <link rel="preload" as="style" key={href} href={href} />
        ))}
        {scripts.map(src => (
          <link rel="preload" as="script" key={src} href={src} />
        ))}
        {styles.map(href => (
          <link rel="stylesheet" key={href} href={href} />
        ))}
        <link rel="preconnect" href={config.apiUrl} />
        <script dangerouslySetInnerHTML={{ __html: initialValues }} />
      </head>
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        {scripts.map(src => (
          <script async key={src} src={src} />
        ))}
      </body>
    </html>
  );

  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};
