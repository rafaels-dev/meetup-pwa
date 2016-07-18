(function(){
    'use strict';
    angular.module('pwa', ['ngMaterial', 'ngRoute'])
        .controller('IndexController', function($scope){
            $scope.message = 'Hello World';
        })
        .config(function($routeProvider, $locationProvider, $mdThemingProvider){

            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('amber');

            $routeProvider.when('/', {
                templateUrl: 'app/templates/index.html',
                controller: 'IndexController'
            });

            $locationProvider.html5Mode(true);
        });
})();