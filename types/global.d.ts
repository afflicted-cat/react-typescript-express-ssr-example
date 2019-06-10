// tslint:disable: no-any

// css-modules
declare module '*.scss' {
  const styles: any;
  export = styles;
}

declare module '*.css' {
  const styles: any;
  export = styles;
}

// images
declare module '*.png' {
  const content: string;
  export = content;
}
declare module '*.svg' {
  const content: string;
  export = content;
}
declare module '*.jpg' {
  const content: string;
  export = content;
}
declare module '*.jpeg' {
  const content: string;
  export = content;
}
declare module '*.gif' {
  const content: string;
  export = content;
}
declare module '*.bmp' {
  const content: string;
  export = content;
}
declare module '*.ico' {
  const content: string;
  export = content;
}

declare module 'i18next-node-remote-backend' {}
