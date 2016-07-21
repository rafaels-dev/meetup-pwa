(function(){
    'use strict';

    function LinksService($q, $http, uuid, db){
      var service = {};
      service.linksUpdated = function(links) {};
      service.getLinks = function(){
          var defer = $q.defer();
          var links = db.objectStore('links');

          $http({
              method: 'GET',
              url: 'https://s3-us-west-2.amazonaws.com/mobiledevbh/links.json?random=' + uuid.generate()
          }).then(function(response){
              var promises = [];
              response.data.forEach(function(item){
                  promises.push(links.insert(item));
              });
              return defer.resolve(response.data);
          }, function(err){
              return links.getAll().then(function(results){
                  return defer.resolve(results);
              });
          });
          return defer.promise;
      };
      return service;
    }

    angular.module('pwa').service('LinksService', ['$q','$http', 'uuid4', '$indexedDB', LinksService]);
})();
