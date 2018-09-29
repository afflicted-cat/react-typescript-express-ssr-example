import * as React from 'react';
import Helmet from 'react-helmet';

interface Props {
  content: string;
  styles?: string[];
  scripts?: string[];
  initialValues?: string;
}

export function Html({ content, styles = [], scripts = [], initialValues = '' }: Props) {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html {...htmlAttrs}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"
        />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {styles.map(href => (
          <link key={href} href={href} rel="stylesheet" />
        ))}
        <script dangerouslySetInnerHTML={{ __html: initialValues }} />
      </head>
      <body {...bodyAttrs}>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        {scripts.map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
}
