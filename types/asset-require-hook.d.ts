declare module 'asset-require-hook' {
  interface Options {
    name?: string;
    extensions?: string | string[];
    mimetype?: string;
    limit?: number;
    publicPath?: string;
    regExp?: string | RegExp;
    context?: string;
    useRelativePath?: boolean;
  }

  const requireHook: (options?: Options) => void;

  export = requireHook;
}
