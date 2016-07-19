(function(){
    'use strict';

    function LinksService($q, $http, uuid){
      var service = {};
      service.getLinks = function(){
          var defer = $q.defer();
          $http({
              method: 'GET',
              url: 'https://s3-us-west-2.amazonaws.com/mobiledevbh/links.json?random=' + uuid.generate()
          }).then(function(response){
              return defer.resolve(response.data);
          });
          return defer.promise;
      };
      return service;
    }

    angular.module('pwa').service('LinksService', ['$q','$http', 'uuid4', LinksService]);
})();
