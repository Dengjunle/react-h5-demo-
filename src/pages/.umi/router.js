import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true,
    "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
    "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
  },
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__User__Login" */'../User/Login'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
        "exact": true,
        "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      },
      {
        "component": () => React.createElement(require('E:/University/react/reactNative/test/react-h5-demo-/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      }
    ],
    "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
    "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "user",
      "admin"
    ],
    "routes": [
      {
        "path": "/",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__paper__index" */'../paper/index'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
        "title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      },
      {
        "path": "/wheel",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__paper__BagWheel" */'../paper/BagWheel'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
        "title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "exact": true,
        "Routes": [require('./TitleWrapper.jsx').default],
        "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      },
      {
        "title": "exception",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "title": "not-permission",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../exception/403'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
            "exact": true,
            "Routes": [require('./TitleWrapper.jsx').default],
            "_title": "exception - not-permission",
            "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
          },
          {
            "path": "/exception/404",
            "title": "not-find",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../exception/404'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
            "exact": true,
            "Routes": [require('./TitleWrapper.jsx').default],
            "_title": "exception - not-find",
            "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
          },
          {
            "path": "/exception/500",
            "title": "server-error",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../exception/500'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
            "exact": true,
            "Routes": [require('./TitleWrapper.jsx').default],
            "_title": "exception - server-error",
            "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
          },
          {
            "component": () => React.createElement(require('E:/University/react/reactNative/test/react-h5-demo-/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
            "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
            "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
          }
        ],
        "_title": "exception",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      },
      {
        "path": "/404",
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('E:/University/react/reactNative/test/react-h5-demo-/src/components/PageLoading/index').default,
}),
        "exact": true,
        "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      },
      {
        "component": () => React.createElement(require('E:/University/react/reactNative/test/react-h5-demo-/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
        "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
      }
    ],
    "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
    "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
  },
  {
    "component": () => React.createElement(require('E:/University/react/reactNative/test/react-h5-demo-/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
    "_title": "澳門珍禧守護您，暴擊病毒贏大禮！",
    "_title_default": "澳門珍禧守護您，暴擊病毒贏大禮！"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
