(function(){
    'use strict';

    function configureMaterialTheme($mdThemingProvider){
      $mdThemingProvider.theme('default')
          .primaryPalette('indigo')
          .accentPalette('amber');
    }

    function createRoutes($routeProvider, $locationProvider){
      $routeProvider.when('/', {
          templateUrl: 'app/templates/index.html',
          controller: 'IndexController'
      });

      $locationProvider.html5Mode(true);
    }

    function configureApp($routeProvider, $locationProvider, $mdThemingProvider){
        configureMaterialTheme($mdThemingProvider);
        createRoutes($routeProvider, $locationProvider);
    }

    function registerServiceWorkers(){
      if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw-assets.js');
      }
    }

    angular.module('pwa', ['ngMaterial', 'ngRoute', 'uuid']).config(configureApp);
    registerServiceWorkers();
})();
