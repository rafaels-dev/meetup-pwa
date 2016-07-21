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

    function createDatabase(db){
      db.connection('meetup-pwa')
        .upgradeDatabase(1, function(event, db, tx){
          var objStore = db.createObjectStore('links', { keyPath: 'id' });
          objStore.createIndex('id_idx','id', {unique: true});
        });
    }

    function configureApp($routeProvider, $locationProvider, $mdThemingProvider, $indexedDBProvider){
        configureMaterialTheme($mdThemingProvider);
        createRoutes($routeProvider, $locationProvider);
        createDatabase($indexedDBProvider);
    }
    function registerServiceWorkers(){
      if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js');
      }
    }

    angular.module('pwa', ['ngMaterial', 'ngRoute', 'uuid','xc.indexedDB']).config(configureApp);
    registerServiceWorkers();
})();
