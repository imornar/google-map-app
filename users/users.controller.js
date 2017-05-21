(function () {
     'use strict';

     angular
          .module('users')
          .controller('UsersCtrl', UsersCtrl);

     UsersCtrl.$inject = ['userService', 'mapService'];
     function UsersCtrl(userService, mapService) {
          const vm = this;
          vm.map = mapService.getMap();
          vm.getMarker = id => vm.markers[_.findIndex(vm.markers, {id})];

          userService.getUsers()
               .then(userService.attachCoordinates)
               .then(usersWithCoordinates => {
                    vm.users = usersWithCoordinates;
                    return usersWithCoordinates;
               })
               .then(mapService.generateMarkers)
               .then(markers => {
                    vm.markers = markers;
               });
     }
}());
