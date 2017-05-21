(function () {
     'use strict';

     angular
          .module('users')
          .factory('userService', userService);

     userService.$inject = ['UsersAPI', '$q'];
     function userService(UsersAPI, $q) {
          const geocoder = new google.maps.Geocoder();
          return {
               getUsers,
               getCoordinates,
               attachCoordinates
          };

          function getUsers({results = 6, nat = 'us'} = {}) {
               return UsersAPI.get({results, nat}).$promise.then(({results}) => results);
          }

          function getCoordinates({location: {street: address}}) {
              return $q((resolve, reject) => {
                   geocoder.geocode({address}, (results, status) => {
                        if (status == google.maps.GeocoderStatus.OK) {
                             resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
                        } else {
                             reject(`Geocode failed, reason: ${status}`);
                        }
                   });
              })
          }

          function attachCoordinates(users) {
               const promises = _.map(users, getCoordinates);
               return $q.all(promises)
                    .then(coordinates => _.map(users, (user, i) => _.assign(user, {coordinates: coordinates[i]})))
          }
     }
}());
