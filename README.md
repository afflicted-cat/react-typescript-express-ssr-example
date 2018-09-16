# React TypeScript Express SSR boilerplate

Ready to grow boilerplate with css-modules, connected-react-router, react-router, redux, redux-thunk, ramda, webpack 4.

You can read more about the organizational strategy used in this app in
[this Medium post](https://medium.com/@nate_wang/feature-oriented-architecture-for-web-applications-2b48e358afb0), or
[this post](https://jaysoo.ca/2016/02/28/organizing-redux-application/).

## Contains

- [x] [React](https://facebook.github.io/react/) 16.5
- [x] [React Router](https://github.com/ReactTraining/react-router) 4.3
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [Redux-Thunk](https://github.com/gaearon/redux-thunk) 2.3
- [x] [connected-react-router](https://github.com/supasate/connected-react-router) 4.4
- [x] [storybook](https://github.com/storybooks/storybook) 4.0.0-alpha.21
- [x] [Ramda](https://github.com/ramda/ramda) 0.2
- [x] [express](https://github.com/expressjs/express) 4.16
- [x] [webpack](https://github.com/webpack/webpack-dev-middleware) 4.19
- [x] [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 3.3
- [x] [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) 2.24
- [x] [babel](https://github.com/babel/babel) 7

## Setup

```
$ yarn
```

## Running

Start express development server

```
$ yarn start
```

## Build

Build client for production

```
$ yarn build:client
```

Build server for production

```
$ yarn build:server
```

Or simply

```
$ yarn build
```

Build server & client for production

## Storybook

Start storybook

```
$ yarn storybook
```

Build storybook

```
$ yarn build-storybook
```

## Analyze the Bundle Size

```
$ yarn analyze
```
