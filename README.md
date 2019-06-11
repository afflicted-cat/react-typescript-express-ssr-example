# React TypeScript Express SSR example

> React ssr exmaple with typescript, babel, css-modules, react-router, redux, redux-thunk, ramda, webpack 4.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

You can read more about the organizational strategy used in this app in
[this Medium post](https://medium.com/@nate_wang/feature-oriented-architecture-for-web-applications-2b48e358afb0), or
[this post](https://jaysoo.ca/2016/02/28/organizing-redux-application/).

## Contains

- [x] [React](https://facebook.github.io/react/) 16.8
- [x] [React Router](https://github.com/ReactTraining/react-router) 5.0
- [x] [Redux](https://github.com/reactjs/redux) 4
- [x] [Redux-Thunk](https://github.com/gaearon/redux-thunk) 2.3
- [x] [react-hot-loader](https://github.com/gaearon/react-hot-loader) 4.11
- [x] [Ramda](https://github.com/ramda/ramda) 0.26
- [x] [express](https://github.com/expressjs/express) 4.17
- [x] [babel](https://github.com/babel/babel) 7
- [x] [webpack](https://github.com/webpack/webpack) 4.33
- [x] [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 3.7
- [x] [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) 2.25

## Aliases

- `@client/*` resolves to `./src/client/*`
- `@server/*` resolves to `./src/server/*`
- `@core/*` resolves to `./src/core/*`

## Routing

Routes in project are objects with the same properties as a `<Route>` with a couple differences:

- the only render prop it accepts is `component` (no `render` or `children`)
- introduces the `routes` key for sub routes
- introduces the `preloadActions` key for preFetch on server
- Consumers are free to add any additional props they'd like to a route, you can access `props.route` inside the
  `component`, this object is a reference to the object used to render and match.
- accepts `key` prop to prevent remounting component when transition was made from route with the same component and
  same `key` prop

```js
const routes = [
  {
    component: Root,
    preloadActions: someAction('someProp'), // preloadActions: {type: 'someAction', payload: someProps}
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
        preloadActions: [someAction('someProp'), someSecondAction('someProps')]
      },
      {
        path: '/child/:id',
        component: Child,
        routes: [
          {
            path: '/child/:id/grand-child',
            component: GrandChild
          }
        ]
      }
    ]
  }
];
```

**Note**: Just like `<Route>`, relative paths are not (yet) supported. When it is supported there, it will be supported
here.

## Using CSS

It uses the usual SCSS css modules. You can find more information [here](https://github.com/css-modules/css-modules)

## Render instead of hydrate in development mode

To be able to reload the page and see the latest code changes, you must set the "localStorage.useRender" value in
development mode (the hydrate method will be replaced with the render)

## Setup

```bash
$ npm install
```

## Running

Start express development server

```bash
$ npm run start
```

## Build

Build client for production

```bash
$ npm run build:client
```

Build server for production

```bash
$ npm run build:server
```

Or simply

```bash
$ npm run build
```

Build server and client for production

## Analyze

Vendors Size (all node_modules)

```bash
$ npm run analyze:vendors
```

Bundle Size (all exclude node_modules)

```bash
$ npm run analyze:bundle
```

Or simply

```bash
$ npm run analyze
```

To see the size and bundle and vendors
