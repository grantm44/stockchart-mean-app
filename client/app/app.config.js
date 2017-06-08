'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $sceDelegateProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.quandl.com/api/v3/**'
    ]);

  //$qProvider.errorOnUnhandledRejections(false);
}
