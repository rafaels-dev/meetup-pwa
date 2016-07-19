(function(){
    'use strict';
    function IndexController($rootScope, $scope,$window, linksService){
      $scope.links = [];
      $scope.openUrl = function openUrl(url){
        $window.open(url);
      };
      function loadContent(){
        $rootScope.loading = true;
        linksService.getLinks().then(function(links){
          $scope.links = links;
          $rootScope.loading = false;
        });
      }
      $rootScope.loadContent = loadContent;
      loadContent();
    }

    angular.module('pwa').controller('IndexController', ['$rootScope','$scope','$window', 'LinksService',IndexController]);
})();
